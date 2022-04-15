import axios from 'axios';

export const GET_USER = 'GET_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOADED_USER = 'LOADED_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const getUser = (userId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/user/${userId}`);
            dispatch({
                type: GET_USER,
                playload: {
                    data: res.data,
                    isLogged: true,
                    isLoaded: true
                }
            });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            await axios.get(`/api/auth/logout`);
            dispatch({ type: LOGOUT_USER });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const loadedUser = () => {
    return (dispatch) => {
        dispatch({ type: LOADED_USER })
    }
}

export const updateUser = (userId, data) => {
    return async (dispatch) => {
        try {
            const newData = await axios.put(`/api/user/${userId}`, data);
            dispatch({
                type: UPDATE_USER,
                playload: newData
            });
        } catch (err) {
            return console.log(err);
        }
    }
}
