import React, { useState, useRef } from 'react'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import { FromNowDate } from '../../../../../../components'
import { CommentContent } from './components'
import { CommentForm } from '../index'

export default function CommentCard({ comment, commentIndex, post, postIndex, user }) {

    // Hooks
    const textareaRef = useRef()

    // Store
    const deviceSize = useSelector(state => state.app.deviceSize)

    // State
    const [displayModifyComment, setDisplayModifyComment] = useState(false)

    const toggleDisplayModifyComment = () => setDisplayModifyComment(!displayModifyComment)

    return (
        <article className='post-comment-card'>
            {
                deviceSize !== 0 &&
                <div className='post-comment-card-left'>
                    <FromNowDate
                        withoutAgo={true}
                        date={comment.createdAt}
                    />
                </div >
            }
            <div className='post-comment-card-center'>
                <span />
                <NavLink to={`/profile/${comment.userId}`}>
                    <img
                        className='post-comment-card-center__avatar'
                        src={comment.User.avatarUrl}
                        alt={`Avatar de ${comment.User.firstName} ${comment.User.lastName}`}
                    />
                </NavLink>
                <span />
            </div>
            <div className='post-comment-card-right'>
                {!displayModifyComment ?
                    <CommentContent
                        key={comment.id}
                        postIndex={postIndex}
                        comment={comment}
                        commentIndex={commentIndex}
                        user={user}
                        toggleDisplayModifyComment={toggleDisplayModifyComment}
                        deviceSize={deviceSize}
                    /> :
                    <CommentForm
                        type={'modify'}
                        toggleDisplayForm={toggleDisplayModifyComment}
                        initialValueText={comment.text}
                        textareaRef={textareaRef}
                        commentId={comment.id}
                        commentIndex={commentIndex}
                        postId={post.id}
                        postIndex={postIndex}
                        user={user}
                    />
                }
            </div>
        </article>
    )
}
