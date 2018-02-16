import axios from 'axios';
// Services
import StorageService from '../services/StorageService';
let URL = 'http://localhost:5000/user';
const STORAGE_KEY = 'user';

if (process.env.NODE_ENV !== 'development'){
    URL = '/user'
}

function loadPrevUser() {
    return StorageService.load(STORAGE_KEY);
}

function loadUser(credentials) {
    return axios.get(`${URL}/${credentials.name}/${credentials.password}`);
}

function saveUser(user) {
    return axios.post(URL, user);
}

function updateUser(user, id) {
    return axios.put(`${URL}/${id}`, user);
}

function clearUserFromStorage() {
    StorageService.clear(STORAGE_KEY);
}

function getEmptyUser() {
    return {
        name: '',
        likedFlatsIds: [],
        bookedFlatsIds: [],
        bookings: [],
        joinedAt: Date.now(),
        email: '',
        password: '',
    }
}

export { STORAGE_KEY };
export default {
    loadPrevUser,
    loadUser,
    saveUser,
    getEmptyUser,
    clearUserFromStorage,
    updateUser
}