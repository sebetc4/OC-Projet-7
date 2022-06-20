import { SET_DEVICE_SIZE, SET_DISPLAY_MOBILE_MENU, SET_COLOR_MODE, TOGGLE_COLOR_MODE, RESET_APP } from "../actions/app.actions";

const appDefaultState = {
    deviceSize: 0,
    displayMobileMenu: false,
    colorMode: 'light'
}

export default function appReducer(state = appDefaultState, action) {
    switch (action.type) {
        case RESET_APP:
            return { ...appDefaultState, deviceSize: state.deviceSize }
        case SET_DEVICE_SIZE:
            return { ...state, deviceSize: action.payload }
        case SET_DISPLAY_MOBILE_MENU:
            return { ...state, displayMobileMenu: action.payload }
        case SET_COLOR_MODE:
            return { ...state, colorMode: action.payload }
        case TOGGLE_COLOR_MODE:
            return { ...state, colorMode: state.colorMode === 'light' ? 'dark' : 'light' }
        default:
            return state;
    }
}