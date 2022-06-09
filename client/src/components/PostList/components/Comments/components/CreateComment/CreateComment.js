import React from 'react'
import { useSelector } from "react-redux";

import { Avatar } from '@mui/material'

import { CommentForm } from '../index'

export default function CreateComment({ type, post, postIndex, user, textareaRef, toggleShowNewComment }) {

    // Store
    const deviceSize = useSelector(state => state.app.deviceSize)

    return (
        <article className='comment-card'>
            {
                (deviceSize !== 0 && type === 'feed') &&
                <div className='comment-card-left'>
                </div >
            }

            <div className='comment-card-center'>
                <span />
                <Avatar
                    className='comment-card-center__avatar'
                    sx={{ width: 40, height: 40 }}
                    src={user.avatarUrl}
                    alt={`Avatar de ${user.firstName} ${user.lastName}`}
                />
                <span />
            </div>
            <div className='comment-card-right'>
                <CommentForm
                    toggleShowCommentForm={toggleShowNewComment}
                    textareaRef={textareaRef}
                    initialValueText={''}
                    postId={post.id}
                    postIndex={postIndex}
                    user={user}
                />
            </div>
        </article>
    )
}
