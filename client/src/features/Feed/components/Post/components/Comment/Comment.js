import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import React from 'react'
import { deleteCommentPost } from '../../../../../../store/actions/posts.actions';


export default function Comment({ posts, postIndex, comment, commentId, commentIndex }) {

    // Hooks
    const dispatch = useDispatch()

    const handleDelete = () => dispatch(deleteCommentPost(commentId, commentIndex, postIndex))
    
    return (
        <div className='feed-comment'>
            <img className='feed-comment__avatar' src={comment.User.avatarUrl} alt='avatar user'></img>
            <div className='feed-comment-content' >
                <div className='feed-comment-content__author-name'>
                    <NavLink to={`/profile/${comment.userId}`}>
                        {`${comment.User.firstName} ${comment.User.lastName}`}
                    </NavLink>
                    <button onClick={handleDelete}>Supprimer</button>
                </div>
                <p className='feed-comment-content__text'>{comment.text}</p>
            </div>
        </div>
    )
}
