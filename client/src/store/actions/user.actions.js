import axios from 'axios';

export const GET_USER = 'GET_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'



export const getUser = (userId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/user/${userId}`);
            dispatch({ 
                type: GET_USER, 
                playload: { ...res.data, isLogged: true} });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            await axios.get(`/api/auth/logout`);
            dispatch({ type: LOGOUT_USER});
        } catch (err) {
            return console.log(err);
        }
    }
}