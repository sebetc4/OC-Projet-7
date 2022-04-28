import { Avatar } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { FromNowDate } from '../../../../../../components'
import { CommentContent, CommentForm } from './components'
import Collapse from '@mui/material/Collapse';

export default function Comments({ post, postIndex, user, displayNewComment, toggleDisplayNewComment }) {

    const textareaRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (displayNewComment && textareaRef)
                textareaRef.current.focus()
        }, 500);
        return () => clearTimeout(timer);
    }, [displayNewComment])

    return (
        <ul className='post-card__comments'>
            <Collapse
                timeout={500}
                orientation="vertical"
                in={displayNewComment}
            >
                <li
                    className='post-comment-card'
                >
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
                            toggleDisplayNewComment={toggleDisplayNewComment}
                            textareaRef={textareaRef}
                            postId={post.id}
                            postIndex={postIndex}
                            user={user}
                        />
                    </div>
                </li>
            </Collapse>

            {post.CommentPosts.length !== 0 && post.CommentPosts.map((comment, index) => (
                <li
                    key={comment.id}
                    className='post-comment-card'
                >
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
                        <CommentContent
                            key={comment.id}
                            postIndex={postIndex}
                            comment={comment}
                            commentIndex={index}
                            user={user}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}
