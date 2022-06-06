import React from 'react'
import { FollowButton } from '../../../../components'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Avatar, Tooltip, AvatarGroup } from '@mui/material';
import { ProfileImageForm } from './components';

export default function ProfileHeader({ profileData, handleFollow, handleUnfollow }) {

    // Hooks
    const navigate = useNavigate()

    // Store
    const user = useSelector(state => state.user.data)


    const navigateToProfile = (id) => navigate(`/profile/${id}`, { replace: true })

    return (
        <section className='profile-top'>
            <div className='profile-top-cover' >
                <img
                    alt={`Couverture de la page de profil de ${profileData.firstName} ${profileData.lastName}`}
                    src={profileData.id === user.id ? user.coverUrl : profileData.coverUrl}
                />
                {
                    user.id === profileData.id &&
                    <ProfileImageForm
                        user={user}
                        field={'cover'}
                        ratio={2.35}
                        cropShape={'rect'}
                        showGrid={true}
                        picture={user.coverUrl}
                    />
                }
            </div >
            <div className='profile-top-content'>
                <div className='profile-top-content-avatar'>
                    <img
                        alt={`avatar de ${profileData.firstName} ${profileData.lastName}`}
                        src={profileData.id === user.id ? user.avatarUrl : profileData.avatarUrl}
                    />
                    {
                        user.id === profileData.id &&
                        <ProfileImageForm
                            user={user}
                            field={'avatar'}
                            ratio={1}
                            cropShape={'round'}
                            showGrid={false}
                            picture={user.avatarUrl}
                        />
                    }
                </div>
                <div className='profile-top-content-infos'>
                    <h1 className='profile-top-content-infos__name'>
                        {`${profileData.firstName} ${profileData.lastName}`}
                    </h1>
                    <p className='profile-top-content-infos__follow-text'>
                        {profileData.followers.length === 0 ?
                            'Cet utilisateur n\'est pas suivi' :
                            profileData.followers.length === 1 ?
                                'Suivi par une personne' :
                                `Suivi par ${profileData.followers.length} personnes`
                        }
                    </p>
                    <div className='profile-top-content-infos__followers'>
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
                    user.id !== profileData.id &&
                    <div className='profile-top-content-follow-button-container'>
                        <FollowButton
                            type={'floatingButton'}
                            user={profileData}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                        />
                    </div>
                }
            </div>
        </section>
    )
}
