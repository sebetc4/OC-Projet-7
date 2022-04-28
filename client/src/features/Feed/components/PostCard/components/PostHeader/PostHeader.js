import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FromNowDate } from '../../../../../../components';
import { PostSettings } from './components';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function PostHeader({ post, postIndex, user, toggleDisplayModifyPost }) {

    // State
    const [userIsAuthorOrAdmin, setUserIsAuthorOrAdmin] = useState(false)
    const [displayPostSettings, setDisplayPostSettings] = useState(false)

    // Check if user is author's post or admin
    useEffect(() => {
        if (post.UserId === user.id || user.isAdmin)
            setUserIsAuthorOrAdmin(true)
    }, [])

    const toggleDisplayPostSettings = () => setDisplayPostSettings(!displayPostSettings)

    return (
        <div className='post-card-header'>
            <Avatar
                className='post-card-header__avatar'
                sx={{ width: 50, height: 50 }}
                src={post.User.avatarUrl}
                alt={`Avatar de ${post.User.firstName} ${post.User.lastName}`}
            />
            <div className='post-card-header__infos'>
                <NavLink to={`/profile/${post.UserId}`}>
                    {`${post.User.firstName} ${post.User.lastName}`}
                </NavLink>
                <FromNowDate date={post.createdAt} />
            </div>
            {userIsAuthorOrAdmin &&
                <div className='post-card-header__settings-button-container'
                >
                    <IconButton
                        onClick={toggleDisplayPostSettings}
                        color="primary"
                        aria-label="Paramètres de commentaire"
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    {displayPostSettings &&
                        <PostSettings
                            closeModal={toggleDisplayPostSettings}
                            toggleDisplayModifyPost={toggleDisplayModifyPost}
                            postId={post.id}
                            postIndex={postIndex}
                        />
                    }
                </div>
            }
        </div>
    )
}
