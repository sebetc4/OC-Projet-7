import { FETCH_USER_DATA, LOGOUT_USER, UPDATE_USER } from '../actions/user.actions'

const userDefaultState = {
    data: {},
    isLogged: false,
    isLoaded: false
}

export default function userReducer(state = userDefaultState, action) {
    switch (action.type) {
        case FETCH_USER_DATA:
            return action.payload
        case LOGOUT_USER:
            return { ...userDefaultState, isLoaded: true }
        case UPDATE_USER:
            return { ...state, data: { ...state.data, ...action.payload } }
        default:
            return state;
    }

}