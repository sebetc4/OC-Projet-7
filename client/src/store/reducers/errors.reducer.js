import { DELETE_ERROR, RESET_ERROR, SET_ERROR, SET_INVALID_TOKEN } from "../actions/errors.actions";

const errorDefaultState = {
    error: null,
    invalidToken: false
}

export default function errorsReducer(state = errorDefaultState, action) {
    switch (action.type) {
        case RESET_ERROR:
            return errorDefaultState
        case SET_ERROR:
            const error = action.playload
            return { ...state, error }
        case DELETE_ERROR:
            return { ...state, error: null }
        case SET_INVALID_TOKEN:
            return { ...state, invalidToken: true }
        default:
            return state;
    }
}