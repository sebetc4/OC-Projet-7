import React from 'react'
import { FromNowDate } from '../../../../../../components';

import Avatar from '@mui/material/Avatar';


export default function PostHeader({ post, user }) {
    return (
        <div className='small-post-card-header'>
            <Avatar
                className='small-post-card-header__avatar'
                sx={{ width: 30, height: 30 }}
                src={user.avatarUrl}
                alt={`Avatar de ${user.firstName} ${user.lastName}`}
            />
            <div className='small-post-card-header__infos'>
                    {`${user.firstName} ${user.lastName}`}
                <FromNowDate date={post.createdAt} update={post.updateAt} />
            </div>
        </div>
    )
}
