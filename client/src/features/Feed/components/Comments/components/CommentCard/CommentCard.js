import React, { useState, useRef } from 'react'

import { Avatar } from '@mui/material'
import { FromNowDate } from '../../../../../../components'
import { CommentContent } from './components'
import { CommentForm } from '../index'

export default function CommentCard({comment, commentIndex, post, postIndex, user}) {

    const textareaRef = useRef()

    const [displayModifyComment, setDisplayModifyComment] = useState(false)

    const toggleDisplayModifyComment = () => setDisplayModifyComment(!displayModifyComment)

    return (
        <div className='post-comment-card'>
            <div className='post-comment-card-left'>
                <FromNowDate
                    withoutAgo={true}
                    date={comment.createdAt}
                />
            </div >

            <div className='post-comment-card-center'>
                <span />
                <Avatar
                    className='post-comment-card-center__avatar'
                    sx={{ width: 40, height: 40 }}
                    src={comment.User.avatarUrl}
                    alt={`Avatar de ${comment.User.firstName} ${comment.User.lastName}`}
                />
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
        </div>
    )
}
