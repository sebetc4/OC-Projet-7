import axios from 'axios';

export const GET_USER = 'GET_USER'

export const getUser = (userId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/user/${userId}`);
            dispatch({ type: GET_USER, playload: { ...res.data, isLoggin: true} });
        } catch (err) {
            return console.log(err);
        }
    }
}