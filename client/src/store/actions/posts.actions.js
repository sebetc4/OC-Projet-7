import axios from 'axios';

export const CREATE_POST = 'CREATE_POST'
export const GET_POSTS = 'GET_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const LIKE_POST = 'LIKE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'



export const createPost = (data, user) => {
    return async (dispatch) => {
        const { id, firstName, lastName, avatarUrl } = user
        const post = await axios.post(`/api/post`, data);
        dispatch({
            type: CREATE_POST,
            playload: { ...post.data, User: { id, firstName, lastName, avatarUrl }, usersLiked: [] }
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

export const likePost = (posts, post, postIndex, userIndex, userId, likeStatut) => {
    return async (dispatch) => {
        if (likeStatut) {
            posts[postIndex].likes = posts[postIndex].likes + 1
            posts[postIndex].usersLiked.push(userId)
        } else {
            posts[postIndex].likes = posts[postIndex].likes - 1
            posts[postIndex].usersLiked.splice(userIndex, 1)
        }
        await axios.post(`/api/post/like/${post.id}`, { userId, likeStatut });
        dispatch({
            type: LIKE_POST,
            playload: posts,
        });
    }
}

export const createComment = () => {
    
}

export const deletePost = (postId, posts, postIndex) => {
    return async (dispatch) => {
        posts.splice(postIndex, 1)
        await axios.delete(`/api/post/${postId}`);
        dispatch({
            type: DELETE_POST,
            playload: posts,
        });
    }
}