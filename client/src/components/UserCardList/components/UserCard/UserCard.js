import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { Button } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { CreationDate, FollowButton } from '../../../index'

export default function UserCard({ cardIndex, userInCard, handleFollow, handleUnfollow }) {

    // Hooks
    const navigate = useNavigate()

    // Store
    const userId = useSelector(state => state.user.data.id)

    const navigateToProfile = (id) => navigate(`/profile/${id}`, { replace: true })

    return (
        <>
            <img
                className='user-card__avatar'
                src={userInCard.avatarUrl}
                alt={`Avatar de ${userInCard.firstName} ${userInCard.lastName}`}
            />
            <div className='user-card-infos'>
                <h3>
                    {`${userInCard.firstName} ${userInCard.lastName}`}
                </h3>
                <p className='user-card-infos__date'>Inscrit le
                    <CreationDate
                        date={userInCard.createdAt}
                        format={' DD/MM/YYYY'}
                    />
                </p>
                <p>
                    {userInCard.followers.length === 0 ?
                        'Cet utilisateur n\'est pas suivi' :
                        userInCard.followers.length === 1 ?
                            'Suivi par une personne' :
                            `Suivi par ${userInCard.followers.length} personnes`
                    }
                </p>
            </div>
            <div className='user-card__actions'>
                {userId !== userInCard.id &&
                    <FollowButton
                        user={userInCard}
                        handleFollow={() => handleFollow(cardIndex)}
                        handleUnfollow={() => handleUnfollow(cardIndex)}
                    />
                }
                <Button
                    color='secondary'
                    startIcon={<AccountBoxIcon />}
                    onClick={() => navigateToProfile(userInCard.id)}
                >
                    Voir le profil
                </Button>
            </div>
        </>
    )
}
