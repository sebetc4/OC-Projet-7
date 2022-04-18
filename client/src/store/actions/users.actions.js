import axios from 'axios';

export const GET_ALL_USERS = 'GET_ALL_USERS'

export const getAllUsers = () => {
    return async (dispatch) => {
        const users = await axios.get(`/api/user`);
        dispatch({
            type: GET_ALL_USERS,
            playload: {
                data: users,
                isLoaded: true
            }
        });
    }
}