import axios from 'axios';
import { resetTodos, setTodos } from './todos.actions';
import { resetUsersFollowed, setUsersFollowed } from './usersFollowed.actions';
import { resetApp, setColorMode } from './app.actions';
import { resetPosts } from './posts.actions';
import { resetError, SET_ERROR } from './errors.actions';

export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const fetchUserData = () => {
    return async (dispatch) => {
        try {
            const user = await axios.get('/api/auth');
            if (user.data.user) {
                dispatch(setColorMode(user.data.user.darkMode))
                dispatch(setTodos(user.data.user.Todos))
                dispatch(setUsersFollowed(user.data.user.following))
                delete user.data.user.darkMode
                delete user.data.user.Todos
                delete user.data.user.followings
                dispatch(fetchUserDataSuccess(user.data.user, true))
            } else
                dispatch(fetchUserDataSuccess(null, false))
        } catch {
            dispatch(fetchUserDataError())
        }
    }
}

const fetchUserDataSuccess = (data, isLogged) => {
    return {
        type: FETCH_USER_DATA,
        playload: {
            data,
            isLogged,
            isLoaded: true
        }
    }
}

const fetchUserDataError = () => {
    return {
        type: SET_ERROR,
        playload: {
            title: 'Erreur du serveur',
            message: 'Echec lors de l\'autentification.'
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            await axios.get(`/api/auth/logout`);
            dispatch(resetUsersFollowed())
            dispatch(resetTodos())
            dispatch(resetPosts())
            dispatch(resetError())
            dispatch(resetApp())
            dispatch(logoutUserSuccess());
        } catch (err) {
            dispatch(logoutUserDelete());
        }
    }
}

const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER,
        playload: ''
    }
}

const logoutUserDelete = () => {
    return {
        type: SET_ERROR,
        playload: {
            title: 'Erreur du serveur',
            message: 'Echec lors de la déconnexion.'
        }

    }
}

export const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        playload: data
    }
}
