import { CREATE_POST, GET_POSTS } from "../actions/posts.actions";

const postsDefaultState = {
    data: [],
    isLoaded: false
}

export default function postsReducer(state = postsDefaultState, action) {
    switch (action.type) {
        case CREATE_POST:
            return action.playload
        case GET_POSTS:
            return { ...state, data: action.playload, isLoaded: true }
        default:
            return state;
    }

}