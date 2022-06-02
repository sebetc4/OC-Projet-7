import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FromNowDate } from '../../../../..';
import { PostCardSettings } from './components';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function PostCardTop({ type, author, post, postIndex, user, toggleShowModifyPost }) {

    // State
    const [userIsAuthorOrAdmin, setUserIsAuthorOrAdmin] = useState(false)
    const [displayPostSettings, setDisplayPostSettings] = useState(false)

    // Check if user is author post or admin
    useEffect(() => {
        if (author.id === user.id || user.isAdmin)
            setUserIsAuthorOrAdmin(true)
    }, [author, user])

    const toggleDisplayPostSettings = () => setDisplayPostSettings(!displayPostSettings)

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
                            {`${author.firstName} ${author.lastName}`}
                        </NavLink>
                        :
                        `${author.firstName} ${author.lastName}`
                }

                <FromNowDate date={post.createdAt} update={post.updatedAt} />
            </div>
            {userIsAuthorOrAdmin &&
                <div className='post-card-top__settings-button-container'
                >
                    <IconButton
                        onClick={toggleDisplayPostSettings}
                        color="primary"
                        aria-label="Paramètres de commentaire"
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    {displayPostSettings &&
                        <PostCardSettings
                            closeModal={toggleDisplayPostSettings}
                            toggleDisplayModifyPost={toggleShowModifyPost}
                            postId={post.id}
                            postIndex={postIndex}
                        />
                    }
                </div>
            }
        </div>
    )
}
