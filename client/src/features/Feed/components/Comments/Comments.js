import React, { useEffect, useRef, useState } from 'react'

import { Collapse, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CommentCard, CreateComment } from './components'

export default function Comments({ post, postIndex, user, displayNewComment, toggleDisplayNewComment }) {

    // Params
    const nbPostsDisplay = 3

    // Hooks
    const textareaRef = useRef()

    // State 
    const [commentList, setCommentList] = useState([])
    const [commentListLength, setCommentListLength] = useState(nbPostsDisplay)

    useEffect(() => {
        if (post.Comments) setCommentList(post.Comments.slice(0, commentListLength))
    }, [post.Comments, post.Comments.length, commentListLength])

    // Set focus on textarea with timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            if (displayNewComment && textareaRef)
                textareaRef.current.focus()
        }, 400);
        return () => clearTimeout(timer);
    }, [displayNewComment])

    const addCommentsInList = () => { setCommentListLength(commentListLength + nbPostsDisplay) }

    return (
        <>
            <ul className='post-card-comments'>
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

                {commentList && commentList.map((comment, index) => (
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
