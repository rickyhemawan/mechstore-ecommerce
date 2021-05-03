import axios from 'axios'

const instance = axios.create({ baseURL: 'https://mech-store.herokuapp.com' })

export default instance
