import axios from 'axios'
//const axios = require('axios');

const journalApi = axios.create({
    baseURL: 'https://vue-demos-v2-7454a-default-rtdb.firebaseio.com'

    //https://vue-demos-v2-default-rtdb.firebaseio.com cambiada el 2023-07-22
})

export default journalApi