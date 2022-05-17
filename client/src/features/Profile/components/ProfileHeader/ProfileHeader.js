import React from 'react'
import { FollowIcon } from '../../../../components'
import { useSelector } from "react-redux";

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';


export default function ProfileHeader({ profileData }) {

    const userId = useSelector(state => state.user.data.id)

    console.log(profileData)

    return (
        <div className='profile-header'>
            <div className='profile-header__cover-image' >
                <img
                    alt={`Couverture de la page de profil de ${profileData.firstName} ${profileData.lastName}`}
                    src={profileData.coverUrl}
                />
            </div >
            <div className='profile-header-content'>
                <img
                    className='profile-header-content__avatar'
                    alt={`avatar de ${profileData.firstName} 
                    ${profileData.lastName}`}
                    src={profileData.avatarUrl}
                />
                <div className='profile-header-content-infos'>
                    <h2 className='profile-header-content-infos__name'>
                        {`${profileData.firstName} ${profileData.lastName}`}
                    </h2>
                    <p className='profile-header-content-infos__follow-text'>
                        {profileData.followers.length === 0 ?
                            'Cette personne n\'est pas suivie' :
                            profileData.followers.length === 1 ?
                                'Suivi par une personne:' :
                                `Suivi par ${profileData.followers.length} personnes:`
                        }
                    </p>
                    <div className='profile-header-content-infos__followers'>
                        {profileData.followers.lenght !== 0 &&

                            <AvatarGroup 
                                total={profileData.followers.lenght}
                                >
                                {profileData.followers && profileData.followers.map((follower, index) => {
                                    if (index < 5)
                                        return (
                                            < Avatar
                                                alt={`Avatar de ${follower.firstName} ${follower.lastName}`}
                                                src={follower.avatarUrl}
                                                sx={{ width: 35, height: 35 }}
                                            />
                                        )
                                    else
                                        return false
                                })}
                            </AvatarGroup>
                        }
                    </div>
                </div>
                {
                    userId !== profileData.id &&
                    <FollowIcon
                        user={profileData}
                    />
                }
            </div>
        </div>
    )
}
