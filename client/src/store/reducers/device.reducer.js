import { GET_DEVICE_SIZE, TOGGLE_DISPLAY_MENU_MOBIL } from "../actions/device.actions";

const deviceDefaultState = {
    size: 0,
    displayMobilMenu: false
}

export default function deviceReducer(state = deviceDefaultState, action) {
    switch (action.type) {
        case GET_DEVICE_SIZE:
            return action.playload
        case TOGGLE_DISPLAY_MENU_MOBIL:
            return { ...state, displayMobilMenu: !state.displayMobilMenu}
        default:
            return state;
    }

}