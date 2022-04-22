import axios from 'axios';

export const GET_USER = 'GET_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOADED_USER = 'LOADED_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'


export const getUser = (user) => {
    return async (dispatch) => {
        dispatch({
            type: GET_USER,
            playload: {
                data: user,
                isLogged: true,
                isLoaded: true
            }
        });
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

export const updateUser = (data) => {
    return async (dispatch) => {
        try {
            const newData = await axios.put(`/api/user`, data);
            dispatch({
                type: UPDATE_USER,
                playload: newData.data
            });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const deleteUser = (data, userId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/user/${userId}`, data);
            dispatch({ type: DELETE_USER });
        } catch (err) {
            return console.log(err);
        }
    }
}
