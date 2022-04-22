import { GET_DEVICE_SIZE } from "../actions/device.actions";

const deviceDefaultState = {
    size: 0
}

export default function deviceReducer(state = deviceDefaultState, action) {
    switch (action.type) {
        case GET_DEVICE_SIZE:
            return action.playload
        default:
            return state;
    }

}