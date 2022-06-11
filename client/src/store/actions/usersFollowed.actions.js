import axios from 'axios';
import { SET_ERROR } from './errors.actions';

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
        try {
            await axios.post(`/api/follow/${userId}`);
            dispatch(addUserFollowedSuccess(data));
        } catch (err) {
            dispatch(addUserFollowedError())
        }
    }
}

export const addUserFollowedSuccess = (data) => {
    return {
        type: ADD_USER_FOLLOWED,
        payload: data

    }
}

export const addUserFollowedError = () => {
    return {
        type: SET_ERROR,
        playload: 'Echec lors de l\'abonnement'
    }
}

export const deleteUserFollowed = (userId, index) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/follow/${userId}`);
            dispatch(deleteUserFollowedSuccess(index));
        } catch {
            dispatch(deleteUserFollowedError())
        }
    }
}

export const deleteUserFollowedSuccess = (index) => {
    return {
        type: DELETE_USER_FOLLOWED,
        payload: index
    }
}

export const deleteUserFollowedError = () => {
    return {
        type: SET_ERROR,
        playload: 'Echec lors du désabonnement'
    }
}