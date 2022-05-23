import React from 'react'
import { FollowIcon } from '../../../../components'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Avatar, Tooltip } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';


export default function ProfileHeader({ profileData, handleFollow, handleUnfollow }) {

    // Hooks
    const navigate = useNavigate()

    // Store
    const userId = useSelector(state => state.user.data.id)


    const navigateToProfile = (id) => navigate(`/profile/${id}`, { replace: true })

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
                            'Cet utilisateur n\'est pas suivi' :
                            profileData.followers.length === 1 ?
                                'Suivi par une personne' :
                                `Suivi par ${profileData.followers.length} personnes`
                        }
                    </p>
                    <div className='profile-header-content-infos__followers'>
                        {profileData.followers.lenght !== 0 &&
                            <AvatarGroup
                                total={profileData.followers.lenght}
                            >
                                {profileData.followers.map((follower, index) => {
                                    if (index < 5)
                                        return (
                                            <Tooltip
                                                key={follower.id}
                                                title={`${follower.firstName} ${follower.lastName}`}
                                                arrow
                                            >
                                                < Avatar
                                                    alt={`Avatar de ${follower.firstName} ${follower.lastName}`}
                                                    src={follower.avatarUrl}
                                                    sx={{ width: 35, height: 35 }}
                                                    onClick={() => navigateToProfile(follower.id)}
                                                />
                                            </Tooltip>
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
                    <div className='profile-header-content-follow-button-container'>
                        <FollowIcon
                            user={profileData}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
