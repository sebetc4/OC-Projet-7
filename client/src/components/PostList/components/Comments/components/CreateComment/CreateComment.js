import React from 'react'
import { useSelector } from "react-redux";

import { Avatar } from '@mui/material'

import { CommentForm } from '../index'

export default function CreateComment({ type, post, postIndex, user, textareaRef, toggleDisplayNewComment }) {

    // Store
    const deviceSize = useSelector(state => state.app.deviceSize)

    return (
        <div className='post-comment-card'>
            {
                (deviceSize !== 0 && type === 'feed') &&
                <div className='post-comment-card-left'>
                </div >
            }

            <div className='post-comment-card-center'>
                <span />
                <Avatar
                    className='post-comment-card-center__avatar'
                    sx={{ width: 40, height: 40 }}
                    src={user.avatarUrl}
                    alt={`Avatar de ${user.firstName} ${user.lastName}`}
                />
                <span />
            </div>
            <div className='post-comment-card-right'>
                <CommentForm
                    toggleDisplayForm={toggleDisplayNewComment}
                    textareaRef={textareaRef}
                    initialValueText={''}
                    postId={post.id}
                    postIndex={postIndex}
                    user={user}
                />
            </div>
        </div>
    )
}
