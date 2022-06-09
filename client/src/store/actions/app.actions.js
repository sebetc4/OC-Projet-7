import axios from 'axios';

export const RESET_APP = 'RESET_APP'
export const SET_DEVICE_SIZE = 'SET_DEVICE_SIZE'
export const SET_DISPLAY_MOBILE_MENU = 'SET_DISPLAY_MOBILE_MENU'
export const TOGGLE_COLOR_MODE = 'TOGGLE_COLOR_MODE'
export const SET_COLOR_MODE = 'SET_COLOR_MODE'

export const resetApp = () => {
    return {
        type: RESET_APP,
        playload:''
    }
}

export const setDeviceSize = (deviceSize) => {
    return {
        type: SET_DEVICE_SIZE,
        playload: deviceSize
    };
}

export const setDisplayMobileMenu = (state) => {
    return {
        type: SET_DISPLAY_MOBILE_MENU,
        playload: state
    }
}

export const setColorMode = (darkMode) => {
    console.log(darkMode)
    return {
        type: SET_COLOR_MODE,
        playload: darkMode ? 'dark' : 'light'
    }
}

export const toggleColorMode = () => {
    return async (dispatch) => {
        try {
            await axios.put('/api/user/toggle-dark-mode');
            dispatch({
                type: TOGGLE_COLOR_MODE,
                playload: ''
            });
        } catch (err) {
            console.log(err)
        };
    }
}
