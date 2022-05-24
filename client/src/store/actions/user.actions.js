import axios from 'axios';
import { setTodos } from './todos.actions';
import { setUsersFollowed } from './usersFollowed.actions';


export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const fetchUserData = () => {
    return async (dispatch) => {
        try {
            const user = await axios.get('/api/auth');
            if (user.data.user) {
                dispatch(setTodos(user.data.user.Todos))
                dispatch(setUsersFollowed(user.data.user.following))
                delete user.data.user.Todos
                delete user.data.user.followings
                dispatch({
                    type: FETCH_USER_DATA,
                    playload: {
                        data: user.data.user,
                        isLogged: true,
                        isLoaded: true
                    }
                })
            } else {
                dispatch({
                    type: FETCH_USER_DATA,
                    playload: {
                        data: null,
                        isLogged: false,
                        isLoaded: true
                    }
                });
            }
        } catch {
            dispatch({
                type: FETCH_USER_DATA,
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
    return {
        type: UPDATE_USER,
        playload: data
    }
}
