// Extenions
import { computed, observable, action, autorun } from 'mobx';
// Services
import TransacService from '../services/TransacService';
import StorageService from '../services/StorageService';
import UserService from '../services/UserService';
import { STORAGE_KEY } from '../services/UserService';

// useStrict(true)

class UserStore {
    // State
    @observable currUser = null

    // Observing functions
    @computed get currUserGetter() {
        return this.currUser;
    }

    // Changing State syncronously
    @action _setUser = (user) => {
        this.currUser = user;
    }

    @action _removeLike = (flatId) => {
        var idx = this.currUser.likedFlatsIds.indexOf(flatId);
        this.currUser.likedFlatsIds.splice(idx, 1);
    }

    @action _addLike = (flatId) => {
        this.currUser.likedFlatsIds.push(flatId);
    }

    @action _clearUser = () => {
        this.currUser = null;
    }

    @action _bookFlat = (bookingDetails) => {
        this.currUser.bookings.push(bookingDetails);
    }

    @action _addTransac = (transacId) => {
        this.currUser.bookedFlatsIds.push(transacId);
    }

    // Accesses from components & pages
    clearUser = () => {
        this._clearUser()
        UserService.clearUserFromStorage();
    }

    addUser = (user) => {
        UserService.saveUser(user)
            .then(res => {
                StorageService.save(STORAGE_KEY, res.data);
                this._setUser(res.data);
            })
    }

    bookFlat = (bookingDetails) => {
        this._bookFlat(bookingDetails);
        UserService.updateUser(this.currUser, this.currUser._id)
            .then(res => {
                StorageService.save(STORAGE_KEY, res.data);
                this._setUser(res.data);
            })
            
        // Adding to transacs collection
        TransacService.saveTransac(bookingDetails)
        .then(res => {
            this._addTransac(res.data._id);
            UserService.updateUser(this.currUser, this.currUser._id)
                .then(res => {
                    StorageService.save(STORAGE_KEY, res.data);
                    this._setUser(res.data);
                })
        })

    }

    loadUser = (credentials) => {
        UserService.loadUser(credentials)
            .then((res) => {
                StorageService.save(STORAGE_KEY, res.data);
                this._setUser(res.data);
            })
    }

    toggleLike = (flatId) => {
        if (!this.currUser.likedFlatsIds.includes(flatId)) {
            this._addLike(flatId);
        } else {
            this._removeLike(flatId);
        }
        UserService.updateUser(this.currUser, this.currUser._id)
            .then(res => {
                StorageService.save(STORAGE_KEY, res.data);
                this._setUser(res.data);
            })
    }

    _loadUser = autorun(() => {
        let user = UserService.loadPrevUser()
        this._setUser(user);
    })
}

const store = new UserStore()
export default store;