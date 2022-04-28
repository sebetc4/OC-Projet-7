import React from 'react'
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

export default function PostActions({ post, toggleLike, userLiked, toggleDisplayNewComment, displayNewComment }) {
    return (
        <div className='post-card-actions'>
            <Divider
                className='post-card-actions__divider-top'
                textAlign="left"
            >
                <Badge badgeContent={post.likes} color="primary">
                    <ThumbUpIcon color="action" />
                </Badge>
            </Divider>
            <Button
                variant="text"
                onClick={toggleLike}
            >
                {userLiked ? 'J\'aime pas' : 'J\'aime'}
            </Button>
            {!displayNewComment ?
                <Button
                    variant="text"
                    onClick={toggleDisplayNewComment}
                >
                    Commenter
                </Button> :
                <Button
                    variant="text"
                    color='warning'
                    onClick={toggleDisplayNewComment}
                >
                    Annuler
                </Button>
            }
            <Divider
                className='post-card-actions__divider-bottom'
                textAlign="right"
            >

                <Badge badgeContent={post.CommentPosts.length} color="primary">
                    <CommentIcon color="action" />
                </Badge>
            </Divider>
        </div>
    )
}
