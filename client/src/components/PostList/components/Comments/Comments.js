import React, { useEffect, useRef, useState } from 'react'

import { Collapse, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CommentCard, CreateComment } from './components'

export default function Comments({ type, post, postIndex, user, showNewComment, toggleShowNewComment }) {

    // Params
    const nbInitialPostsDisplay = type === 'feed' ? 3 : 0
    const nbMorePostsDisplay = 3

    // Hooks
    const textareaRef = useRef()

    // State 
    const [commentList, setCommentList] = useState([])
    const [commentListLength, setCommentListLength] = useState(nbInitialPostsDisplay)

    useEffect(() => {
        if (post.Comments) setCommentList(post.Comments.slice(0, commentListLength))
    }, [post.Comments, post.Comments.length, commentListLength])

    // Set focus on textarea with timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            if (showNewComment && textareaRef)
                textareaRef.current.focus()
        }, 400);
        return () => clearTimeout(timer);
    }, [showNewComment])

    const addCommentsInList = () => setCommentListLength(commentListLength + nbMorePostsDisplay)

    return (
        <>
            <ul className={`post-card-comments ${type === 'feed' ? '' : 'post-card-comments--small'}`}>
                <Collapse
                    timeout={500}
                    orientation="vertical"
                    in={showNewComment}
                >
                    <li>
                        <CreateComment
                            type={type}
                            post={post}
                            postIndex={postIndex}
                            user={user}
                            textareaRef={textareaRef}
                            toggleShowNewComment={toggleShowNewComment}
                        />
                    </li>
                </Collapse>

                {commentList && commentList.map((comment, index) => (
                    <li
                        key={comment.id}
                    >
                        <CommentCard
                            type={type}
                            comment={comment}
                            commentIndex={index}
                            post={post}
                            postIndex={postIndex}
                            user={user}
                        />
                    </li>
                ))}
            </ul>
            <div className='post-card-comments-bottom'>
                {commentListLength < post.Comments.length &&
                    <Button
                        size="large"
                        endIcon={<ExpandMoreIcon />}
                        onClick={addCommentsInList}
                    >
                        Afficher plus de commentaires
                    </Button>
                }
            </div>
        </>
    )
}
