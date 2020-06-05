import axios from 'axios'

const service = axios.create({
    baseURL: 'http://',
    timeout: 5000
})

service.interceptors.request.use(
config => {

    return config

},
error => {

})
