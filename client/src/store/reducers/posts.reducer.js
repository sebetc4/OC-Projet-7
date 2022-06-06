import { RESET_POSTS, CREATE_POST_SUCCESS, FETCH_POSTS_SUCCESS, ALL_POSTS_FETCH, LIKE_POST_SUCCESS, UPDATE_POST_SUCCESS, DELETE_POST_SUCCESS, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS, UPDATE_COMMENT_SUCCESS, POSTS_ERROR, POST_SUBMITTING } from "../actions/posts.actions";

const postsDefaultState = {
    data: [],
    type: '',
    isLoaded: false,
    submitting: false,
    allPostsFetch: false,
    error: null,
}

export default function postsReducer(state = postsDefaultState, action) {
    switch (action.type) {
        case RESET_POSTS: {
            return postsDefaultState
        }
        case POST_SUBMITTING: {
            return { ...state, submitting: true, error: false }
        }
        case CREATE_POST_SUCCESS: {
            const post = action.playload
            return { ...state, data: [post, ...state.data], submitting: false, error: false }
        }
        case FETCH_POSTS_SUCCESS: {
            const { posts, type } = action.playload
            return { ...state, data: [...state.data, ...posts], type, isLoaded: true, allPostsFetch: false, error: false }
        }
        case ALL_POSTS_FETCH: {
            const { posts, type } = action.playload
            return { ...state, data: [...state.data, ...posts], type, isLoaded: true, allPostsFetch: true, error: false }
        }
        case UPDATE_POST_SUCCESS: {
            const { postIndex, newPost } = action.playload
            const data = [...state.data]
            const lastData = data[postIndex]
            data[postIndex] = { ...lastData, ...newPost }
            return { ...state, data, submitting: false, error: false }
        }
        case DELETE_POST_SUCCESS: {
            const postIndex = action.playload
            const data = [...state.data]
            data.splice(postIndex, 1)
            return { ...state, data, submitting: false, error: false }
        }
        case LIKE_POST_SUCCESS: {
            const { postIndex, likeStatut, userId, userIndex } = action.playload
            const data = [...state.data]
            if (likeStatut)
                data[postIndex].usersLiked.push(userId)
            else
                data[postIndex].usersLiked.splice(userIndex, 1)
            return { ...state, data, error: false }
        }
        case CREATE_COMMENT_SUCCESS: {
            const { comment, postIndex } = action.playload
            const data = [...state.data]
            data[postIndex].Comments.unshift(comment)
            return { ...state, data, error: false }
        }
        case UPDATE_COMMENT_SUCCESS: {
            const { commentIndex, postIndex, text } = action.playload
            const data = [...state.data]
            data[postIndex].Comments[commentIndex].text = text
            return { ...state, data, error: false }
        }
        case DELETE_COMMENT_SUCCESS: {
            const { commentIndex, postIndex } = action.playload
            const data = [...state.data]
            data[postIndex].Comments.splice(commentIndex, 1)
            return { ...state, data, error: false }
        }
        case POSTS_ERROR: {
            const error = action.playload
            return { ...state, submitting: false, error }
        }
        default:
            return state;
    }

}