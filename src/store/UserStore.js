import { computed, observable, action, autorun } from 'mobx';
import UserService from '../services/UserService';
import TransacService from '../services/TransacService';
import StorageService from '../services/StorageService';
const STORAGE_KEY = 'user';


class UserStore {

    @observable currUser = null

    @computed get currUserGetter() {
        // console.log('computing user')
        return this.currUser;
    }

    @action _setUser = (user) => {
        this.currUser = user;
        // console.log('currUser: ', this.currUser)
    }

    @action _removeLike = (flatId) => {
        var idx = this.currUser.likedFlatsIds.indexOf(flatId)
        this.currUser.likedFlatsIds.splice(idx, 1)
        console.log(this.currUser)
    }

    @action _addLike = (flatId) => {
        this.currUser.likedFlatsIds.push(flatId)
        console.log(this.currUser)
    }

    @action _clearUser = () => {
        this.currUser = null;
    }

    @action _bookFlat = (bookingDetails) => {
        this.currUser.bookedFlatsIds.push(bookingDetails);
    }

    @action _addTransac = (transacId) => {
        this.currUser.bookedFlats.push(transacId);
    }

    clearUser = () => {
        this._clearUser()
        UserService.clearUserFromStorage();
    }

    addUser = (user) => {
        UserService.saveUser2(user)
            .then(res => {
                StorageService.save(STORAGE_KEY, res.data);
                this._setUser(res.data);
            })
    }

    bookFlat = (bookingDetails) => {

        TransacService.saveTransac(bookingDetails)
            .then(res => {
                console.log('transac server answer', res.data)
                this._addTransac(res.data._id);
                UserService.updateUser(this.currUser, this.currUser._id)
                    .then(res => {
                        StorageService.save(STORAGE_KEY, res.data);
                        this._setUser(res.data);
                        console.log(this.currUser);
                    })
            })

        this._bookFlat(bookingDetails);
        UserService.updateUser(this.currUser, this.currUser._id)
            .then(res => {
                StorageService.save(STORAGE_KEY, res.data);
                this._setUser(res.data);
            })
    }

    loadUser = (credentials) => {
        // console.log('loadUser ran');       
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

    getLikedFlats = () => {
        // return Service.getByIds(this.user.liked)


    }

    _loadUser = autorun(() => {
        // console.log('autorun ran... _loadUser ran')
        let user = UserService.loadPrevUser()
        this._setUser(user);
    })
}

const store = new UserStore()
export default store;