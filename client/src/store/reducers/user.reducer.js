import { GET_USER } from '../actions/user.actions'

export default function userReducer(state = {isLoggin: false}, action) {
    switch (action.type) {
        case GET_USER:
            return action.playload
        default:
            return state;
    }
}