import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deletePost } from '../../../../../../store/actions/posts.actions';

import { ConfirmModal, FromNowDate } from '../../../../..';
import { PostCardSettings } from './components';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function PostCardTop({ type, author, post, postIndex, user, toggleShowModifyPost }) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [userIsAuthorOrAdmin, setUserIsAuthorOrAdmin] = useState(false)
    const [showPostSettings, setShowPostSettings] = useState(false)
    const [showDeleteConfirmModale, setShowDeleteConfirmModale] = useState(false)

    // Check if user is author post or admin
    useEffect(() => {
        if (author.id === user.id || user.isAdmin)
            setUserIsAuthorOrAdmin(true)
    }, [author, user])

    const handleDeletePost = () => dispatch(deletePost(post.id, postIndex))


    const toggleShowPostSettings = () => setShowPostSettings(!showPostSettings)
    const toggleShowDeleteConfirmModale = () => setShowDeleteConfirmModale(prev => !prev)


    return (
        <div className={`post-card-top ${type === 'feed' ? '' : 'post-card-top--small'}`}>
            {
                type !== 'profile' ?
                    <NavLink to={`/profile/${author.id}`}>
                        <img
                            className='post-card-top__avatar'
                            src={author.avatarUrl}
                            alt={`Avatar de ${author.firstName} ${author.lastName}`}
                        />
                    </NavLink> :
                    <img
                        className='post-card-top__avatar'
                        src={author.avatarUrl}
                        alt={`Avatar de ${author.firstName} ${author.lastName}`}
                    />
            }
            <div className='post-card-top__infos'>
                {
                    type !== 'profile' ?
                        <NavLink to={`/profile/${author.id}`}>
                            <h3>{author.firstName} {author.lastName}</h3>
                        </NavLink>
                        :
                        <h3>{author.firstName} {author.lastName}</h3>
                }

                <FromNowDate date={post.createdAt} update={post.updatedAt} />
            </div>
            {userIsAuthorOrAdmin &&
                <div className='post-card-top__settings-button-container'
                >
                    <IconButton
                        onClick={toggleShowPostSettings}
                        color="secondary"
                        aria-label="Paramètres de commentaire"
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    {showPostSettings &&
                        <PostCardSettings
                            closeModal={toggleShowPostSettings}
                            toggleShowModifyPost={toggleShowModifyPost}
                            toggleShowDeleteConfirmModale={toggleShowDeleteConfirmModale}
                        />
                    }
                </div>
            }
                <ConfirmModal
                    title={'Confirmer la supression du post'}
                    content={`Voulez vous vraiment supprimer ce post?`}
                    button='Supprimer'
                    showConfirmModale={showDeleteConfirmModale}
                    toggleShowConfirmModale={toggleShowDeleteConfirmModale}
                    onClickConfirm={handleDeletePost}
                />
        </div>
    )
}
