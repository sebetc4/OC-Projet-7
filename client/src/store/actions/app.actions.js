import api from '../../config/api.config';
import { SET_ERROR } from './errors.actions';

export const RESET_APP = 'RESET_APP'
export const SET_DEVICE_SIZE = 'SET_DEVICE_SIZE'
export const SET_DISPLAY_MOBILE_MENU = 'SET_DISPLAY_MOBILE_MENU'
export const TOGGLE_COLOR_MODE = 'TOGGLE_COLOR_MODE'
export const SET_COLOR_MODE = 'SET_COLOR_MODE'

export const resetApp = () => {
    return {
        type: RESET_APP,
        payload: ''
    }
}

export const setDeviceSize = (deviceSize) => {
    return {
        type: SET_DEVICE_SIZE,
        payload: deviceSize
    };
}

export const setDisplayMobileMenu = (state) => {
    return {
        type: SET_DISPLAY_MOBILE_MENU,
        payload: state
    }
}

export const setColorMode = (darkMode) => {
    return {
        type: SET_COLOR_MODE,
        payload: darkMode ? 'dark' : 'light'
    }
}

export const toggleColorMode = () => {
    return async (dispatch) => {
        try {
            await api.put('user/toggle-dark-mode');
            dispatch(toggleColorModeSuccess());
        } catch (err) {
            dispatch(toggleColorModeError())
        }
    }
}

export const toggleColorModeSuccess = () => {
    return {
        type: TOGGLE_COLOR_MODE,
        payload: ''
    }
}

export const toggleColorModeError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la modification du mode de couleur'
        }
    }
}
