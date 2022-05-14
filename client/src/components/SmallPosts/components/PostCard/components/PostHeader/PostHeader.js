import React, { useEffect, useState } from 'react'
import { FromNowDate } from '../../../../../../components';

import Avatar from '@mui/material/Avatar';


export default function PostHeader({ post, profileData }) {

    return (
        <div className='post-card-header'>
            <Avatar
                className='post-card-header__avatar'
                sx={{ width: 50, height: 50 }}
                src={profileData.avatarUrl}
                alt={`Avatar de ${profileData.firstName} ${profileData.lastName}`}
            />
            <div className='post-card-header__infos'>
                    {`${profileData.firstName} ${profileData.lastName}`}
                <FromNowDate date={post.createdAt} />
            </div>
        </div>
    )
}
