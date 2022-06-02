import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { CommentSettings } from '../index';
import { FromNowDate } from '../../../../../../../../components'

export default function CommentContent({ type, postIndex, comment, commentIndex, user, toggleShowModifyComment, deviceSize }) {

    // State
    const [userIsAuthorOrAdmin, setUserIsAuthorOrAdmin] = useState(false)
    const [displayCommentSettings, setDisplayCommentSettings] = useState(false)

    // Check if user is author's post or admin
    useEffect(() => {
        if (comment.userId === user.id || user.isAdmin)
            setUserIsAuthorOrAdmin(true)
    }, [comment, user])

    const toggleDisplayCommentSettings = () => setDisplayCommentSettings(!displayCommentSettings)

    return (
        <div className='comment-card-right-content'>
            <div className='comment-card-right-content__author-name-text-container'>
                <NavLink to={`/profile/${comment.userId}`}>
                    {`${comment.User.firstName} ${comment.User.lastName}`}
                </NavLink>
                {
                    (deviceSize === 0 || type !== 'feed') &&
                    <FromNowDate
                        withoutAgo={true}
                        date={comment.createdAt}
                    />
                }

                <p>{comment.text}</p>
            </div>
            <div>
                {userIsAuthorOrAdmin &&
                    <div className='comment-card-right-content__settings-container'>
                        <IconButton
                            onClick={toggleDisplayCommentSettings}
                            color="primary"
                            aria-label="Paramètres de commentaire"
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        {displayCommentSettings &&
                            <CommentSettings
                                closeModal={toggleDisplayCommentSettings}
                                commentId={comment.id}
                                commentIndex={commentIndex}
                                postIndex={postIndex}
                                toggleShowModifyComment={toggleShowModifyComment}
                            />
                        }
                    </div>
                }
            </div>
        </div>
    )
}
