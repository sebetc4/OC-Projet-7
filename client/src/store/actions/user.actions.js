import axios from 'axios';
import { getTodos } from './todos.actions';
import { getUsersFollowed } from './usersFollowed.actions';


export const GET_USER = 'GET_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const getUser = () => {
    return async (dispatch) => {
        try {
            const user = await axios.get('/api/auth');
            if (user.data.user) {
                dispatch(getTodos(user.data.user.Todos))
                dispatch(getUsersFollowed(user.data.user.following))
                delete user.data.user.Todos
                delete user.data.user.followings
                dispatch({
                    type: GET_USER,
                    playload: {
                        data: user.data.user,
                        isLogged: true,
                        isLoaded: true
                    }
                })
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
    return (dispatch) => {
        dispatch({
            type: UPDATE_USER,
            playload: data
        });
    }
}
