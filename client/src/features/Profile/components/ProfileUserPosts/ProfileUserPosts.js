import React from 'react'
import { SmallPosts } from '../../../../components';


export default function ProfileUserPosts({profileData}) {
    return (
        <div className='profile-user-posts'>
            <h3 className='profile-user-posts__title'>Posts:</h3>
            <SmallPosts
                type='profile'
                posts={profileData.Posts}
                user={profileData}
            />
        </div>
    )
}
