import { GET_USER, LOADED_USER, LOGOUT_USER, MODIFY_USER } from '../actions/user.actions'

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
            return { ...state, isLogged: false }
        case LOADED_USER:
            return { ...state, isLoaded: true }
        case MODIFY_USER:
            console.log(action.playload)
            return { ...state, data: { ...state.data, ...action.playload} }
        default:
            return state;
    }

}