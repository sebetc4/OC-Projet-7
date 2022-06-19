import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteComment } from '../../../../../../../../store/actions/posts.actions';


import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { CommentSettings } from '../index';
import { ConfirmModal, FromNowDate } from '../../../../../../../../components'

export default function CommentContent({ type, postIndex, comment, commentIndex, user, toggleShowModifyComment, deviceSize }) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [userIsAuthorOrAdmin, setUserIsAuthorOrAdmin] = useState(false)
    const [showCommentSettings, setShowCommentSettings] = useState(false)
    const [showDeleteConfirmModale, setShowDeleteConfirmModale] = useState(false)

    // Check if user is author's post or admin
    useEffect(() => {
        if (comment.userId === user.id || user.isAdmin)
            setUserIsAuthorOrAdmin(true)
    }, [comment, user])

    const handleDeleteComment = () => dispatch(deleteComment(comment.id, commentIndex, postIndex))

    const toggleShowCommentSettings = () => setShowCommentSettings(prev => !prev)
    const toggleShowDeleteConfirmModale = () => setShowDeleteConfirmModale(prev => !prev)

    return (
        <div className='comment-card-right-content'>
            <div className='comment-card-right-content__author-name-text-container'>
                <NavLink to={`/profile/${comment.userId}`}>
                    {`${comment.User.firstName} ${comment.User.lastName}`}
                </NavLink>
                {
                    (deviceSize === 0 || type !== 'feed') &&
                    <div className='comment-card-right-content__author-name-text-container-date'>
                        <FromNowDate
                            withoutAgo={true}
                            date={comment.createdAt}
                        />
                    </div>
                }
                <p>{comment.text}</p>
            </div>
            <div>
                {userIsAuthorOrAdmin &&
                    <div className='comment-card-right-content__settings-container'>
                        <IconButton
                            onClick={toggleShowCommentSettings}
                            color="secondary"
                            aria-label="Paramètres de commentaire"
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        {showCommentSettings &&
                            <CommentSettings
                                closeModal={toggleShowCommentSettings}
                                toggleShowModifyComment={toggleShowModifyComment}
                                toggleShowDeleteConfirmModale={toggleShowDeleteConfirmModale}
                            />
                        }
                    </div>
                }
            </div>
            <ConfirmModal
                title={'Confirmer la supression du commentaire'}
                content={`Voulez vous vraiment supprimer ce commentaire?`}
                button='Supprimer'
                showConfirmModale={showDeleteConfirmModale}
                toggleShowConfirmModale={toggleShowDeleteConfirmModale}
                onClickConfirm={handleDeleteComment}
            />
        </div>
    )
}
