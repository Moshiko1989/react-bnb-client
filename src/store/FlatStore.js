// Extentions
import { computed, observable, action, useStrict } from 'mobx';
// Services
import FlatService from '../services/FlatService'

useStrict(true)

class FlatObservableStore {
	// State
	@observable flats = [];
	@observable currFlat = null;
	@observable bookedByUser = null;
	@observable userLikedFlats = null;

	// Observing functions
	@computed get userLikedFlatsGetter() {
		return this.userLikedFlats;
	}

	@computed get bookedByUserGetter() {
		return this.bookedByUser;
	}

	@computed get flatsGetter() {
		return this.flats;
	}

	@computed get flatGetter() {
		return this.currFlat;
	}

	// Changing State syncronously
	@action _userBooking = (bookingDetails) => {
		this.currFlat.bookings.push(bookingDetails);
	}

	@action _setBookedByUser = (flats) => {
		this.bookedByUser = flats;
	}

	@action _setUserLikedFlats = (flats) => {
		this.userLikedFlats = flats;
	}

	@action setFlats = (flats) => {
		this.flats = flats;
	}

	@action _setCurrFlat = (flat) => {
		this.currFlat = flat;
	}

	@action _addLike = (userId) => {
		this.currFlat.userLikedIds.push(userId);
	}

	@action _removeLike = (userId) => {
		var idx = this.currFlat.userLikedIds.indexOf(userId);
		this.currFlat.userLikedIds.splice(idx, 1);
	}

	// Accesses from components & pages
	userBooking = (bookingDetails) => {
		this._userBooking(bookingDetails);
		FlatService.updateFlat(this.currFlat, this.currFlat._id)
			.then(res => {
				this._setCurrFlat(res.data);
			})
	}

	loadFlats = () => {
		FlatService.getFlats()
			.then(this.setFlats)
	}
	loadFlatById = (id) => {
		FlatService.getFlatById(id)
			.then((res) => { this._setCurrFlat(res.data) })
	}

	loadLikedFlats = (ids) => {
		FlatService.getFlatsByIds(ids)
			.then(res => {
				this._setUserLikedFlats(res.data);
			})
	}

	loadBookedFlats = (ids) => {
		FlatService.getFlatsByIds(ids)
			.then(res => {
				this._setBookedByUser(res.data);
			})
	}

	toggleLike = (userId, flat) => {
		if (flat) this._setCurrFlat(flat);

		if (!this.currFlat.userLikedIds.includes(userId)) {
			this._addLike(userId);
		} else {
			this._removeLike(userId);
		}
		FlatService.updateFlat(this.currFlat, this.currFlat._id)
			.then(res => {
				this._setCurrFlat(res.data);
			})
	}
}


const FlastStore = new FlatObservableStore();
export default FlastStore