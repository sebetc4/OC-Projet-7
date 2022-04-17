import { GET_USER, LOADED_USER, LOGOUT_USER, UPDATE_USER, DELETE_USER } from '../actions/user.actions'

const userDefaultState = {
    data: {},
    isLogged: false,
    isLoaded: false
}

export default function userReducer(state = userDefaultState, action) {
    switch (action.type) {
        case GET_USER:
            return action.playload
        case LOGOUT_USER:
            return { ...userDefaultState, isLoaded: true }
        case LOADED_USER:
            return { ...state, isLoaded: true }
        case UPDATE_USER:
            return { ...state, data: { ...state.data, ...action.playload } }
        case DELETE_USER:
            return { ...userDefaultState, isLoaded: true }
        default:
            return state;
    }

}