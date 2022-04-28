import axios from 'axios';

export const CREATE_POST = 'CREATE_POST'
export const GET_POSTS = 'GET_POSTS'
export const MODIFY_POST = 'MODIFY_POST'
export const DELETE_POST = 'DELETE_POST'
export const LIKE_POST = 'LIKE_POST'
export const CREATE_COMMENT_POST = 'CREATE_COMMENT_POST'
export const DELETE_COMMENT_POST = 'DELETE_COMMENT_POST'




export const createPost = (data, user) => {
    return async (dispatch) => {
        const { firstName, lastName, avatarUrl } = user
        const post = await axios.post(`/api/post`, data);
        dispatch({
            type: CREATE_POST,
            playload: { ...post.data, User: { firstName, lastName, avatarUrl }, usersLiked: [], CommentPosts: [] }
        });
    }
}

export const getAllPosts = () => {
    return async (dispatch) => {
        const posts = await axios.get(`/api/post`);
        posts.data.forEach((post, index) => {
            const usersLiked = post.usersLiked.map(user => user.id);
            posts.data[index].usersLiked = usersLiked
        });
        dispatch({
            type: GET_POSTS,
            playload: posts.data,
        });
    }
}

export const modifyPost = (data, postId, postIndex) => {
    return async (dispatch) => {
        const newPost = await axios.put(`/api/post/${postId}`, data);
        dispatch({
            type: MODIFY_POST,
            playload: { postIndex, newPost: newPost.data }
        });
    }
}

export const deletePost = (postId, postIndex) => {
    return async (dispatch) => {
        await axios.delete(`/api/post/${postId}`);
        dispatch({
            type: DELETE_POST,
            playload: {postIndex},
        });
    }
}

export const likePost = (post, postIndex, userId, userIndex, likeStatut) => {
    return async (dispatch) => {
        await axios.post(`/api/post/like/${post.id}`, { likeStatut });
        dispatch({
            type: LIKE_POST,
            playload: { postIndex, likeStatut, userId, userIndex }
        });
    }
}

export const createCommentPost = (postId, postIndex, user, text) => {
    const { id, firstName, lastName, avatarUrl } = user
    return async (dispatch) => {
        const comment = await axios.post(`/api/comment-post/${postId}`, { text });
        comment.data.User = { id, firstName, lastName, avatarUrl }
        dispatch({
            type: CREATE_COMMENT_POST,
            playload: { comment, postIndex }
        });
    }
}

export const deleteCommentPost = (commentId, commentIndex, postIndex) => {
    return async (dispatch) => {
        await axios.delete(`/api/comment-post/${commentId}`)
        dispatch({
            type: DELETE_COMMENT_POST,
            playload: {commentIndex, postIndex}
        });
    }
}