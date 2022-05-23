import axios from 'axios';

export const GET_USERS_FOLLOWED = 'GET_FOLLOWING'
export const ADD_USER_FOLLOWED = 'ADD_FOLLOWING'
export const DELETE_USER_FOLLOWED = 'DELETE_USER_FOLLOWED'

export const visibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_DONE: 'SHOW_DONE',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const getUsersFollowed = (usersFollowed) => {
    return {
        type: GET_USERS_FOLLOWED,
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