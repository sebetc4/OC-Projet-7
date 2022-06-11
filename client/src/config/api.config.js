import * as axios from 'axios'
import { store } from '../store'

import { logoutUser } from '../store/actions/user.actions';

const api = axios.create({
    baseURL: '/api/'
})

api.interceptors.response.use(response => {
    return response
}, err => {
    if (err.response.data === 'Invalid token') {
        store.dispatch(logoutUser())
    }
});

export default api;