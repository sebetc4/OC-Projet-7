import { ADD_USER_FOLLOWED, DELETE_USER_FOLLOWED, GET_USERS_FOLLOWED } from "../actions/usersFollowed.actions"

const usersFollowedDefaultState = {
    data: [],
}

export default function usersFollowedReducer(state = usersFollowedDefaultState, action) {
    switch (action.type) {
        case GET_USERS_FOLLOWED: {
            const data = action.payload
            return {
                data
            }
        }
        case ADD_USER_FOLLOWED: {
            const newUserFollowed = action.payload
            return {
                ...state,
                data: [...state.data, newUserFollowed]
            }
        }
        case DELETE_USER_FOLLOWED: {
            const index = action.payload
            const data = [...state.data]
            data.splice(index, 1)
            return {
                data
            }
        }

        default:
            return state;
    }
}