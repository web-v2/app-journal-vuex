import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-v2-default-rtdb.firebaseio.com'
})

export default journalApi

