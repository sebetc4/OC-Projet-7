import React, { useState } from 'react'
import { ConfirmModal, FollowButton } from '../../../../components'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import api from '../../../../config/api.config';

import { Avatar, Tooltip, AvatarGroup, Fab } from '@mui/material';
import { ProfileImageForm } from './components';
import { setError } from '../../../../store/actions/errors.actions';

export default function ProfileHeader({ profileData, handleFollow, handleUnfollow }) {

    // Hooks
    const navigate = useNavigate()

    // Store
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()

    // State
    const [showDisableAccountConfirmModale, setShowDisableAccountConfirmModale] = useState(false)

    const navigateToProfile = (id) => navigate(`/profile/${id}`, { replace: true })

    const handleDisableAccount = async () => {
        try {
            await api.delete(`admin/disable-user-account/${profileData.id}`)
            toggleShowDisableAccountConfirmModale()
            navigate(`/home`, { replace: true })
        } catch {
            dispatch(setError({
                title: 'Erreur du serveur',
                message: 'Echec de la désactivation du compte'
            }))
        }
    }

    const toggleShowDisableAccountConfirmModale = () => setShowDisableAccountConfirmModale(prev => !prev)

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

                    <div className='profile-top-content-actions'>
                        <FollowButton
                            type={'floatingButton'}
                            size={user.isAdmin ? 'small' : 'large'}
                            user={profileData}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                        />
                        {user.isAdmin &&
                            <Fab
                                color='warning'
                                variant="extended"
                                size='small'
                                onClick={toggleShowDisableAccountConfirmModale}
                            >
                                Désactiver le Compte
                            </Fab>
                        }
                    </div>
                }
            </div>
            <ConfirmModal
                title={'Confirmer la désactivation du compte'}
                content={`Voulez vous vraiment désactiver ce compte?`}
                button='Désactiver'
                showConfirmModale={showDisableAccountConfirmModale}
                toggleShowConfirmModale={toggleShowDisableAccountConfirmModale}
                onClickConfirm={handleDisableAccount}
            />
        </section>
    )
}
