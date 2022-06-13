import * as axios from 'axios'

import { store } from '../store'
import { setInvalidToken } from '../store/actions/errors.actions';

const api = axios.create({
    baseURL: '/api/'
})

api.interceptors.response.use(response => {
    return response
}, err => {
    if (err.response.data === 'Invalid token') {
        store.dispatch(setInvalidToken())
    }
    return Promise.reject(err);
});

export default api;