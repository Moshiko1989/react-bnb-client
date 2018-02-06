import axios from 'axios'
let URL = 'http://localhost:4000/api/flats'
// if (process.env.NODE_ENV !== 'development') {
//     URL = ''
// }

const flats = [];

function getFlats(query = null) {
    // return Promise.resolve(flats)
    return axios.get(URL).then(res => res.data)
        .catch(err => {
            throw err;
        });
}

function getFlatById(id) {
    return axios.get(`${URL}/${id}`)

    // return new Promise((res, rej) => {
    //     res(flats.find(flat => flat._id === id))
    // })

}

function getFlatsByIds(flatIds) {
    let strFlatIds = JSON.stringify(flatIds);
    return axios.get(`${URL}/liked/${strFlatIds}`);
}

function updateFlat(flat, id) {
    console.log('flat: ', flat);
    return axios.put(`${URL}/${id}`, flat)
}


export default {
    getFlats,
    getFlatById,
    updateFlat,
    getFlatsByIds
}
