import { SET_DEVICE_SIZE, TOGGLE_DISPLAY_MENU_MOBIL } from "../actions/app.actions";

const appDefaultState = {
    deviceSize: 0,
    displayMobilMenu: false
}

export default function appReducer(state = appDefaultState, action) {
    switch (action.type) {
        case SET_DEVICE_SIZE:
            return { ...state, ...action.playload }
        case TOGGLE_DISPLAY_MENU_MOBIL:
            return { ...state, displayMobilMenu: !state.displayMobilMenu}
        default:
            return state;
    }

}