import axios from 'axios';

export const CREATE_POST = 'CREATE_POST'
export const GET_POSTS = 'GET_POSTS'

export const createPost = (data) => {
    return async (dispatch) => {
        const newData = await axios.post(`/api/post`, data);
        dispatch({
            type: CREATE_POST,
            playload: newData,
        });
    }
}

export const getAllPosts = (userId) => {
    return async (dispatch) => {
        const posts = await axios.get(`/api/post`, userId);
        dispatch({
            type: GET_POSTS,
            playload: posts.data,
        });
    }
}