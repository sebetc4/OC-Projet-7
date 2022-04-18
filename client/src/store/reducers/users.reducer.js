import { GET_ALL_USERS } from "../actions/users.actions";

const usersDefaultState = {
    data: [],
    isLoaded: false
}

export default function userReducer(state = usersDefaultState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return action.playload
        default:
            return state;
    }
}