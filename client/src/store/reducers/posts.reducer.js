import { CREATE_POST, GET_POSTS, LIKE_POST, DELETE_POST } from "../actions/posts.actions";

const postsDefaultState = {
    data: [],
    isLoaded: false
}

export default function postsReducer(state = postsDefaultState, action) {
    switch (action.type) {
        case CREATE_POST:
            return { ...state, data: [...state.data, action.playload] }
        case GET_POSTS:
            return { ...state, data: action.playload, isLoaded: true }
        case DELETE_POST:
            return { ...state, data: action.playload }
        case LIKE_POST:
            return { ...state, data: action.playload }
        default:
            return state;
    }

}