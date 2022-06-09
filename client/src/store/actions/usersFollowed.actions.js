import axios from 'axios';

export const RESET_USERS_FOLLOWED = 'RESET_USERS_FOLLOWED'
export const SET_USERS_FOLLOWED = 'GET_FOLLOWING'
export const ADD_USER_FOLLOWED = 'ADD_FOLLOWING'
export const DELETE_USER_FOLLOWED = 'DELETE_USER_FOLLOWED'


export const resetUsersFollowed = () => {
    return {
        type: RESET_USERS_FOLLOWED,
        payload: ''
    }
}

export const setUsersFollowed = (usersFollowed) => {
    return {
        type: SET_USERS_FOLLOWED,
        payload: usersFollowed
    }
}

export const addUserFollowed = (userId, data) => {
    return async (dispatch) => {
        await axios.post(`/api/follow/${userId}`);
        dispatch({
            type: ADD_USER_FOLLOWED,
            payload: data
        });
    }
}

export const deleteUserFollowed = (userId, index) => {
    return async (dispatch) => {
        await axios.delete(`/api/follow/${userId}`);
        dispatch({
            type: DELETE_USER_FOLLOWED,
            payload: index
        });
    }
}