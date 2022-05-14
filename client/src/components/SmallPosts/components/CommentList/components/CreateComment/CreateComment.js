import React from 'react'

import { Avatar } from '@mui/material'
import { CommentForm } from '../index'

export default function CreateComment({ post, postIndex, user, textareaRef, toggleDisplayNewComment }) {
    return (
        <div className='post-comment-card'>
            <div className='post-comment-card-left'>
            </div >

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
