import axios from 'axios';

export const GET_USER = 'GET_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'


export const getUser = () => {
    return async (dispatch) => {
        try {
            const user = await axios.get('/api/auth')
            if (user.data.user) {
                dispatch({
                    type: GET_USER,
                    playload: {
                        data: user.data.user,
                        isLogged: true,
                        isLoaded: true
                    }
                });
            } else {
                dispatch({
                    type: GET_USER,
                    playload: {
                        data: null,
                        isLogged: false,
                        isLoaded: true
                    }
                });
            }
        } catch {
            dispatch({
                type: GET_USER,
                playload: {
                    data: null,
                    isLogged: false,
                    isLoaded: true
                }
            });
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

export const deleteUser = () => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/user/`);
            dispatch({ type: DELETE_USER });
        } catch (err) {
            return console.log(err);
        }
    }
}
