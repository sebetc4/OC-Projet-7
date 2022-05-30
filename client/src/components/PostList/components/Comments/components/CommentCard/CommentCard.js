import React, { useState, useRef } from 'react'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import { FromNowDate } from '../../../../../../components'
import { CommentContent } from './components'
import { CommentForm } from '../index'

export default function CommentCard({ type, comment, commentIndex, post, postIndex, user }) {

    // Hooks
    const textareaRef = useRef()

    // Store
    const deviceSize = useSelector(state => state.app.deviceSize)

    // State
    const [showModifyComment, setShowModifyComment] = useState(false)

    const toggleShowModifyComment = () => setShowModifyComment(!showModifyComment)

    return (
        <article className='comment-card'>
            {
                (deviceSize !== 0 && type === 'feed') &&
                <div className='comment-card-left'>
                    <FromNowDate
                        withoutAgo={true}
                        date={comment.createdAt}
                    />
                </div >
            }
            <div className='comment-card-center'>
                <span />
                <NavLink to={`/profile/${comment.userId}`}>
                    <img
                        className='comment-card-center__avatar'
                        src={comment.User.avatarUrl}
                        alt={`Avatar de ${comment.User.firstName} ${comment.User.lastName}`}
                    />
                </NavLink>
                <span />
            </div>
            <div className='comment-card-right'>
                {!showModifyComment ?
                    <CommentContent
                        key={comment.id}
                        type={type}
                        postIndex={postIndex}
                        comment={comment}
                        commentIndex={commentIndex}
                        user={user}
                        toggleShowModifyComment={toggleShowModifyComment}
                        deviceSize={deviceSize}
                    /> :
                    <CommentForm
                        type={'modify'}
                        toggleShowCommentForm={toggleShowModifyComment}
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
