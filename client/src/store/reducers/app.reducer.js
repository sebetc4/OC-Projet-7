import { SET_DEVICE_SIZE, SET_DISPLAY_MOBILE_MENU } from "../actions/app.actions";

const appDefaultState = {
    deviceSize: 0,
    displayMobilMenu: false
}

export default function appReducer(state = appDefaultState, action) {
    switch (action.type) {
        case SET_DEVICE_SIZE:
            return { ...state, ...action.playload }
        case SET_DISPLAY_MOBILE_MENU:
            return { ...state, displayMobileMenu: action.playload}
        default:
            return state;
    }

}