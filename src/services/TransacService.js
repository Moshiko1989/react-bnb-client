import axios from 'axios'
let URL = 'http://localhost:4000/transaction'
// if (process.env.NODE_ENV !== 'development') {
//     URL = ''
// }

function saveTransac(transac) {
    return axios.post(URL, transac);
}

export default {
    saveTransac,
}
