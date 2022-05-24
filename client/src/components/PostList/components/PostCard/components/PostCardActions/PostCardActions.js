import React from 'react'
import { useSelector } from 'react-redux'

import { Button, Badge, Divider } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

export default function PostCardActions({ type, post, toggleLike, userLiked, toggleShowNewComment, showNewComment }) {

    // Store
    const deviceSize = useSelector(state => state.app.deviceSize)

    return (
        <div className={`post-card-actions ${type === 'feed' ? '' : 'post-card-actions--small'}`}>
            {deviceSize !== 0 && type === 'feed' ?
                <>
                    <Divider
                        className='post-card-actions__divider-top'
                        textAlign="left"
                    >
                        <Badge badgeContent={post.usersLiked.length} color="primary">
                            <ThumbUpIcon color="action" />
                        </Badge>
                    </Divider>
                    <Button
                        variant="text"
                        onClick={toggleLike}
                    >
                        {userLiked ? 'J\'aime pas' : 'J\'aime'}
                    </Button>
                    {!showNewComment ?
                        <Button
                            variant="text"
                            onClick={toggleShowNewComment}
                        >
                            Commenter
                        </Button> :
                        <Button
                            variant="text"
                            color='warning'
                            onClick={toggleShowNewComment}
                        >
                            Annuler
                        </Button>
                    }
                    <Divider
                        className='post-card-actions__divider-bottom'
                        textAlign="right"
                    >

                        <Badge badgeContent={post.Comments.length} color="primary">
                            <CommentIcon color="action" />
                        </Badge>
                    </Divider>
                </>
                :
                <>
                    <div className='post-card-badges'>
                        <div className='post-card-badges__item'>
                            <Badge
                                badgeContent={post.usersLiked.length}
                                color="primary"
                            >
                                <ThumbUpIcon color="action" />
                            </Badge>
                        </div>
                        <div className='post-card-badges__item'>
                            <Badge
                                badgeContent={post.Comments.length}
                                color="primary"
                            >
                                <CommentIcon color="action" />
                            </Badge>
                        </div>
                    </div>
                    <Divider />
                    <Button
                        variant="text"
                        onClick={toggleLike}
                    >
                        {userLiked ? 'J\'aime pas' : 'J\'aime'}
                    </Button>
                    {!showNewComment ?
                        <Button
                            variant="text"
                            onClick={toggleShowNewComment}
                        >
                            Commenter
                        </Button> :
                        <Button
                            variant="text"
                            color='warning'
                            onClick={toggleShowNewComment}
                        >
                            Annuler
                        </Button>
                    }
                    <Divider />

                </>
            }

        </div>
    )
}
