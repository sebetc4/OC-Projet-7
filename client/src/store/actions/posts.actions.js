import api from '../../config/api.config';
import { SET_ERROR } from './errors.actions';

export const RESET_POSTS = 'RESET_POSTS'
export const POST_SUBMITTING = 'POST_SUBMITTING'
export const POST_SUBMITTING_ERROR = 'POST_SUBMITTING_ERROR'
export const CREATE_POST = 'CREATE_POST'
export const FETCH_POSTS = 'GET_POSTS'
export const ALL_POSTS_FETCH = 'ALL_POSTS_FETCH'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const LIKE_POST = 'LIKE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const resetPosts = () => {
    return {
        type: RESET_POSTS,
        payload: ''
    }
}

export const postSubmitting = () => {
    return {
        type: POST_SUBMITTING,
        payload: ''
    }
}

export const postSubmittingError = () => {
    return {
        type: POST_SUBMITTING_ERROR,
        payload: ''
    }
}

export const createPost = (data, user) => {
    return async (dispatch) => {
        try {
            dispatch(postSubmitting())
            const post = await api.post(`post`, data);
            dispatch(createPostSuccess(post.data, user));
        } catch {
            dispatch(postSubmittingError())
            dispatch(createPostError())
        }
    }
}

export const createPostSuccess = (post, user) => {
    const { firstName, lastName, avatarUrl, id } = user
    return {
        type: CREATE_POST,
        payload: { ...post, User: { firstName, lastName, avatarUrl, id }, usersLiked: [], Comments: [] }
    }
}

export const createPostError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de l\'ajout du post'
        }
    }
}

export const fetchPosts = (count, nbPostsInRes) => {
    return async (dispatch) => {
        try {
            const posts = await api.get(`post/?offset=${count}&limit=${nbPostsInRes}`);
            posts.data.length === nbPostsInRes ?
                dispatch(fetchPostsSucess(posts.data, 'feed', false))
                :
                dispatch(fetchPostsSucess(posts.data, 'feed', true));
        } catch (err) {
            dispatch(fetchPostsError())
        }
    }
}

export const fetchPostsSucess = (data, type, allPostsFetch) => {
    const posts = data.map((post, index) => {
        const usersLiked = post.usersLiked.map(user => user.id);
        post.usersLiked = usersLiked
        return post
    });
    if (!allPostsFetch)
        return {
            type: FETCH_POSTS,
            payload: { posts, type }
        };
    else
        return {
            type: ALL_POSTS_FETCH,
            payload: { posts, type }
        };
}

export const fetchPostsError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la récupération des posts.'
        }
    }
}

export const updatePost = (data, postId, postIndex) => {
    return async (dispatch) => {
        dispatch(postSubmitting())
        try {
            const newPost = await api.put(`post/${postId}`, data);
            dispatch(updatePostSuccess(postIndex, newPost.data));
        } catch (err) {
            dispatch(postSubmittingError())
            updatePostError()
        }
    }
}

export const updatePostSuccess = (postIndex, newPost) => {
    return {
        type: UPDATE_POST,
        payload: { postIndex, newPost }
    }
}

export const updatePostError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la modification du post.'
        }
    }
}

export const deletePost = (postId, postIndex) => {
    return async (dispatch) => {
        dispatch(postSubmitting())
        try {
            await api.delete(`post/${postId}`);
            dispatch(deletePostSuccess(postIndex));
        } catch (err) {
            dispatch(deletePostSuccess())
        }
    }
}

export const deletePostSuccess = (postIndex) => {
    return {
        type: DELETE_POST,
        payload: postIndex,
    }
}

export const deletePostError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la supression du post.'
        }
    }
}

export const likePost = (post, postIndex, userId, userIndex, likeStatut) => {
    return async (dispatch) => {
        try {
            await api.put(`post/like/${post.id}`, { likeStatut });
            dispatch(likePostSuccess(postIndex, userId, userIndex, likeStatut));
        } catch (err) {
            dispatch(likePostError())
        }
    }
}

export const likePostSuccess = (postIndex, userId, userIndex, likeStatut) => {
    return {
        type: LIKE_POST,
        payload: { postIndex, likeStatut, userId, userIndex }
    };
}

export const likePostError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec du like / dislike.'
        }
    }
}

export const createComment = (postId, postIndex, user, text) => {
    return async (dispatch) => {
        try {
            const comment = await api.post(`comment/${postId}`, { text });
            dispatch(createCommentPostSuccess(user, comment.data, postIndex))
        } catch (err) {
            dispatch(createCommentError())
        }

    }
}

export const createCommentPostSuccess = (user, comment, postIndex) => {
    const { id, firstName, lastName, avatarUrl } = user
    comment.User = { id, firstName, lastName, avatarUrl }
    return {
        type: CREATE_COMMENT,
        payload: { comment, postIndex }
    };
}

export const createCommentError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de l\'ajout du commentaire.'
        }
    }
}

export const updateComment = (commentId, commentIndex, postIndex, text) => {
    return async (dispatch) => {
        try {
            await api.put(`comment/${commentId}`, { text });
            dispatch(updateCommentSuccess(commentIndex, postIndex, text))
        } catch (err) {
            updateCommentError()
        }
    }
}

export const updateCommentSuccess = (commentIndex, postIndex, text) => {
    return {
        type: UPDATE_COMMENT,
        payload: { commentIndex, postIndex, text }
    };
}

export const updateCommentError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la modification du commentaire.'
        }
    }
}

export const deleteComment = (commentId, commentIndex, postIndex) => {
    return async (dispatch) => {
        try {
            await api.delete(`comment/${commentId}`)
            dispatch(deleteCommentSuccess(commentIndex, postIndex))
        } catch (err) {
            dispatch(deleteCommentError)
        }
    }
}

export const deleteCommentSuccess = (commentIndex, postIndex) => {
    return {
        type: DELETE_COMMENT,
        payload: { commentIndex, postIndex }
    }
}

export const deleteCommentError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la supression du commentaire.'
        }
    }
}