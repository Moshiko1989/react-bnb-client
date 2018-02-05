import StorageService from '../services/StorageService'

import axios from 'axios'
var URL = 'http://localhost:4000/api/user';
// if (process.env.NODE_ENV !== 'development'){
//     URL = ''
// }
// import uniqid from 'uniqid'

const STORAGE_KEY = 'user';

function loadPrevUser() {
    return StorageService.load(STORAGE_KEY);
}

function loadUser(credentials) {
    console.log('credentials: ', credentials);
    return axios.get(`${URL}/${credentials.name}/${credentials.password}`)
        
    // return new Promise((res, rej) => {
    //     setTimeout(() => {
    //         res({
    //             name: 'mock user from server',
    //             bookedFlats: [],
    //             likedFlatsIds: [],
    //         })
    //     }, 250)
    // })
}

// Saves user to server & updates local storage. 
// Name of method will be changed.
function saveUser2(user) {
    // Moshiko server
    return axios.post(URL, user)//.then(res => {
        // StorageService.save(STORAGE_KEY, res.data);
        // let user = res.data;
        // console.log('new user from server: ', user);
        // return user;
    // }).catch(err => {
    //     throw err
    // });
}

function saveUser(user) {
    // console.log(user);

    // Mock server
    return new Promise((res, rej) => {
        StorageService.save(STORAGE_KEY, user)
        setTimeout(() => {
            res(user)
        }, 250)
    })

    // Naman server
    // return axios.post(`${URL}/data/user`, user)
    //  .then(res => {
    //     StorageService.save(STORAGE_KEY,res.data)
    //     return res.data
    //  })
    //  .catch(err => { 
    //      throw err })
}

function getEmptyUser() {
    return {
        // id: 'mock id',
        name: '',
        likedFlatsIds: [],
        bookedFlats: [],
        joinedAt: Date.now(),
        email: '',
        password: '',
    }
}

function clearUserFromStorage() {
    StorageService.clear(STORAGE_KEY)
}

function updateUser(user, id) {
    console.log('user: ', user);
    return axios.put(`${URL}/${id}`, user)

    // Mock server
    // return new Promise((res, rej) => {
    //     setTimeout(() => {
    //         // var newUser = JSON.parse(JSON.stringify(user))
    //         console.log(user.likedFlatsIds)
    //         // newUser.likedFlatsIds.push(id);
    //         res(user);
    //     }, 1000);
    // })
}

export default {
    STORAGE_KEY,
    loadPrevUser,
    loadUser,
    saveUser,
    saveUser2,
    getEmptyUser,
    clearUserFromStorage,
    updateUser
}