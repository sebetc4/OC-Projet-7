import axios from 'axios';

export const RESET_POSTS = 'RESET_POSTS'

export const CREATE_POST = 'CREATE_POST'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'

export const FETCH_POSTS = 'GET_POSTS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const ALL_POSTS_FETCH = 'ALL_POSTS_FETCH'

export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'

export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'

export const LIKE_POST = 'LIKE_POST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'

export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS'

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'

export const POSTS_ERROR = 'POSTS_ERROR'


export const resetPosts = () => {
    return {
        type: RESET_POSTS,
        playload: ''
    }
}

export const createPost = (data, user) => {
    return async (dispatch) => {
        try {
            const post = await axios.post(`/api/post`, data);
            dispatch(createPostSuccess(post.data, user));
        } catch {
            dispatch(createPostError())
        }
    }
}

export const createPostSuccess = (post, user) => {
    const { firstName, lastName, avatarUrl, id } = user
    return {
        type: CREATE_POST_SUCCESS,
        playload: { ...post, User: { firstName, lastName, avatarUrl, id }, usersLiked: [], Comments: [] }
    }
}

export const createPostError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors de l\'ajout du post'
    }
}

export const fetchPosts = (count, nbPostsInRes) => {
    return async (dispatch) => {
        try {
            const posts = await axios.get(`/api/post/?offset=${count}&limit=${nbPostsInRes}`);
            if (posts.data.length === nbPostsInRes)
                dispatch(fetchPostsSucess(posts.data, 'feed', false));
            else
                dispatch(fetchPostsSucess(posts.data, 'feed', true));
        } catch {
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
            type: FETCH_POSTS_SUCCESS,
            playload: { posts, type }
        };
    else
        return {
            type: ALL_POSTS_FETCH,
            playload: { posts, type }
        };
}

export const fetchPostsError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors de la récupération des posts.'
    }
}

export const updatePost = (data, postId, postIndex) => {
    return async (dispatch) => {
        try {
            const newPost = await axios.put(`/api/post/${postId}`, data);
            dispatch(updatePostSuccess(postIndex, newPost.data));
        } catch {
            updatePostError()
        }
    }
}

export const updatePostSuccess = (postIndex, newPost) => {
    return {
        type: UPDATE_POST_SUCCESS,
        playload: { postIndex, newPost }
    }
}

export const updatePostError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors de la modification du post.'
    }
}

export const deletePost = (postId, postIndex) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/post/${postId}`);
            dispatch(deletePostSuccess(postIndex));
        } catch {

        }
    }
}

export const deletePostSuccess = (postIndex) => {
    return {
        type: DELETE_POST_SUCCESS,
        playload: postIndex,
    }
}

export const deletePostError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors de la supression du post.'
    }
}

export const likePost = (post, postIndex, userId, userIndex, likeStatut) => {
    return async (dispatch) => {
        try {
            await axios.put(`/api/post/like/${post.id}`, { likeStatut });
            dispatch(likePostSuccess(postIndex, userId, userIndex, likeStatut));
        } catch {

        }
    }
}

export const likePostSuccess = (postIndex, userId, userIndex, likeStatut) => {
    return {
        type: LIKE_POST_SUCCESS,
        playload: { postIndex, likeStatut, userId, userIndex }
    };
}

export const likePostError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors du like / dislike.'
    }
}

export const createComment = (postId, postIndex, user, text) => {
    return async (dispatch) => {
        try {
            const comment = await axios.post(`/api/comment/${postId}`, { text });
            dispatch(createCommentPostSuccess(user, comment.data, postIndex))
        } catch {
            dispatch(createCommentError())
        }

    }
}

export const createCommentPostSuccess = (user, comment, postIndex) => {
    const { id, firstName, lastName, avatarUrl } = user
    comment.User = { id, firstName, lastName, avatarUrl }
    return {
        type: CREATE_COMMENT_SUCCESS,
        playload: { comment, postIndex }
    };
}

export const createCommentError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors de l\'ajout du commentaire.'
    }
}

export const updateComment = (commentId, commentIndex, postIndex, text) => {
    return async (dispatch) => {
        try {
            await axios.put(`/api/comment/${commentId}`, { text });
            dispatch(updateCommentSuccess(commentIndex, postIndex, text))
        } catch {
            updateCommentError()
        }
    }
}

export const updateCommentSuccess = (commentIndex, postIndex, text) => {
    return {
        type: UPDATE_COMMENT_SUCCESS,
        playload: { commentIndex, postIndex, text }
    };
}

export const updateCommentError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors de la modification du commentaire.'
    }
}


export const deleteComment = (commentId, commentIndex, postIndex) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/comment/${commentId}`)
            dispatch(deleteCommentSuccess(commentIndex, postIndex))
        } catch {
            dispatch(deleteCommentError)
        }
    }
}

export const deleteCommentSuccess = (commentIndex, postIndex) => {
    return {
        type: DELETE_COMMENT_SUCCESS,
        playload: { commentIndex, postIndex }
    }
}

export const deleteCommentError = () => {
    return {
        type: POSTS_ERROR,
        playload: 'Echec lors de la supression du commentaire.'
    }
}