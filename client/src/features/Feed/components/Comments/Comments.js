import React, { useEffect, useRef } from 'react'

import { Avatar } from '@mui/material'
import { CommentCard, CommentForm, CreateComment } from './components'
import Collapse from '@mui/material/Collapse';

export default function Comments({ post, postIndex, user, displayNewComment, toggleDisplayNewComment }) {

    const textareaRef = useRef()

    // Set focus on textarea with timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            if (displayNewComment && textareaRef)
                textareaRef.current.focus()
        }, 400);
        return () => clearTimeout(timer);
    }, [displayNewComment])

    return (
        <ul className='post-card__comments'>
            <Collapse
                timeout={500}
                orientation="vertical"
                in={displayNewComment}
            >
                <li>
                   <CreateComment 
                   post={post}
                   postIndex={postIndex} 
                   user={user} 
                   textareaRef={textareaRef} 
                   toggleDisplayNewComment={toggleDisplayNewComment}
                   /> 
                </li>
            </Collapse>

            {post.CommentPosts.length !== 0 && post.CommentPosts.map((comment, index) => (
                <li
                    key={comment.id}
                >
                    <CommentCard
                    comment={comment}
                    commentIndex={index}
                    post={post}
                    postIndex={postIndex}
                    user={user}
                    />
                </li>
            ))}
        </ul>
    )
}
