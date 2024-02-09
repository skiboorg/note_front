import { boot } from 'quasar/wrappers'
import axios from 'axios'


const api = axios.create({ baseURL: process.env.API_URL })

export default boot(({ app, ssrContext }) => {


})

export { api }
