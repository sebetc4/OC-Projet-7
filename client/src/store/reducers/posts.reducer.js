import { CREATE_POST, GET_POSTS, LIKE_POST, MODIFY_POST, DELETE_POST, CREATE_COMMENT_POST, DELETE_COMMENT_POST } from "../actions/posts.actions";

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

        case MODIFY_POST: {
            const data = state.data.map((post, postIndex) => {
                if (postIndex === action.playload.postIndex)
                    return { ...post, ...action.playload.newPost }
                else
                    return post
            })
            return { ...state, data }
        }
        case DELETE_POST: {
            const { postIndex } = action.playload
            const data = [...state.data]
            data.splice(postIndex, 1)
            return { ...state, data }
        }
        case LIKE_POST: {
            const { postIndex, likeStatut, userId, userIndex } = action.playload
            const data = [...state.data]
            if (likeStatut) {
                data[postIndex].likes = state.data[postIndex].likes + 1
                data[postIndex].usersLiked.push(userId)
            } else {
                data[postIndex].likes = state.data[postIndex].likes - 1
                data[postIndex].usersLiked.splice(userIndex, 1)
            }
            return { ...state, data }
        }
        case CREATE_COMMENT_POST: {
            const { comment, postIndex } = action.playload
            const data = [...state.data]
            data[postIndex].CommentPosts.push(comment.data)
            return { ...state, data }
        }
        case DELETE_COMMENT_POST: {
            const { commentIndex, postIndex } = action.playload
            const data = [...state.data]
            data[postIndex].CommentPosts.splice(commentIndex, 1)
            return { ...state, data }
        }
        default:
            return state;
    }

}