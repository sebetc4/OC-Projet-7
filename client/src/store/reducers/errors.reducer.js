import { DELETE_ERROR, SET_ERROR, SET_INVALID_TOKEN } from "../actions/errors.actions";

const errorDefaultState = {
    error: null,
    invalidToken: false
}

export default function appReducer(state = errorDefaultState, action) {
    switch (action.type) {
        case SET_ERROR:
            const error = action.playload
            return { error, invalidToken: false }
        case DELETE_ERROR:
            return { error: null, invalidToken: false }
        case SET_INVALID_TOKEN:
            return { error: false, invalidToken: true }
        default:
            return state;
    }
}