import { RESET_POSTS, CREATE_POST, FETCH_POSTS, ALL_POSTS_FETCH, LIKE_POST, UPDATE_POST, DELETE_POST, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, POST_SUBMITTING, POST_SUBMITTING_ERROR } from "../actions/posts.actions";

const postsDefaultState = {
    data: [],
    type: '',
    isLoaded: false,
    submitting: false,
    allPostsFetch: false,
}

export default function postsReducer(state = postsDefaultState, action) {
    switch (action.type) {
        case RESET_POSTS: {
            return postsDefaultState
        }
        case POST_SUBMITTING: {
            return {
                ...state, submitting: true
            }
        }
        case POST_SUBMITTING_ERROR: {
            return { ...state, submitting: false }
        }
        case CREATE_POST: {
            const post = action.playload
            return { ...state, data: [post, ...state.data], submitting: false }
        }
        case FETCH_POSTS: {
            const { posts, type } = action.playload
            return { ...state, data: [...state.data, ...posts], type, isLoaded: true, allPostsFetch: false }
        }
        case ALL_POSTS_FETCH: {
            const { posts, type } = action.playload
            return { ...state, data: [...state.data, ...posts], type, isLoaded: true, allPostsFetch: true }
        }
        case UPDATE_POST: {
            const { postIndex, newPost } = action.playload
            const data = [...state.data]
            const lastData = data[postIndex]
            data[postIndex] = { ...lastData, ...newPost }
            return { ...state, data, submitting: false }
        }
        case DELETE_POST: {
            const postIndex = action.playload
            const data = [...state.data]
            data.splice(postIndex, 1)
            return { ...state, data, submitting: false }
        }
        case LIKE_POST: {
            const { postIndex, likeStatut, userId, userIndex } = action.playload
            const data = [...state.data]
            if (likeStatut)
                data[postIndex].usersLiked.push(userId)
            else
                data[postIndex].usersLiked.splice(userIndex, 1)
            return { ...state, data }
        }
        case CREATE_COMMENT: {
            const { comment, postIndex } = action.playload
            const data = [...state.data]
            data[postIndex].Comments.unshift(comment)
            return { ...state, data }
        }
        case UPDATE_COMMENT: {
            const { commentIndex, postIndex, text } = action.playload
            const data = [...state.data]
            data[postIndex].Comments[commentIndex].text = text
            return { ...state, data }
        }
        case DELETE_COMMENT: {
            const { commentIndex, postIndex } = action.playload
            const data = [...state.data]
            data[postIndex].Comments.splice(commentIndex, 1)
            return { ...state, data }
        }
        default:
            return state;
    }

}