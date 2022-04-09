import { GET_USER, LOGOUT_USER } from '../actions/user.actions'

export default function userReducer(state = {isLogged: false}, action) {
    switch (action.type) {
        case GET_USER:
            return action.playload
        case LOGOUT_USER:
            return {isLogged: false}
        default:
            return state;
    }
}