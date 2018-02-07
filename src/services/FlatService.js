import axios from 'axios'
const URL = 'http://localhost:4000/flats'
// if (process.env.NODE_ENV !== 'development') {
//     URL = ''
// }

function getFlats(query = null) {
    return axios.get(URL).then(res => res.data);
}

function getFlatById(id) {
    return axios.get(`${URL}/${id}`);
}

function getFlatsByIds(flatIds) {
    let strFlatIds = JSON.stringify(flatIds);
    return axios.get(`${URL}/ids/${strFlatIds}`);
}

function updateFlat(flat, id) {
    return axios.put(`${URL}/${id}`, flat);
}


export default {
    getFlats,
    getFlatById,
    updateFlat,
    getFlatsByIds
}
