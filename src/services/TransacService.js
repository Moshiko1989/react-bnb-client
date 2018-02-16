import axios from 'axios'
let URL = 'http://localhost:5000/transaction'
if (process.env.NODE_ENV !== 'development') {
    URL = '/transaction'
}

function saveTransac(transac) {
    return axios.post(URL, transac);
}

export default {
    saveTransac,
}
