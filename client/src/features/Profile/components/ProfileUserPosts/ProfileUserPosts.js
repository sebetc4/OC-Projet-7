import React from 'react'
import { SmallPostsList } from '../../../../components';


export default function ProfileUserPosts({profileData}) {
    return (
        <div className='profile-user-posts'>
            <h3 className='profile-user-posts__title'>Posts:</h3>
            <SmallPostsList
                type='profile'
                posts={profileData.Posts}
                user={profileData}
            />
        </div>
    )
}
