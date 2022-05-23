import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


import { Chip } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { CreationDate, FollowIcon } from '../index'

export default function UserCardList({ users }) {

    // Hooks
    const navigate = useNavigate()

    // Store
    const userId = useSelector(state => state.user.data.id)

    const navigateToProfile = (id) => {
        navigate(`/profile/${id}`, { replace: true })
    }

    return (
        <>
            {
                users && users.map((user, index) => (
                    <article
                        className='user-card'
                        key={user.id}
                    >
                        <img
                            className='user-card__avatar'
                            src={user.avatarUrl}
                            alt={`Avatar de ${user.firstName} ${user.lastName}`}
                        />
                        <div className='user-card__infos'>
                            <p>
                                {`${user.firstName} ${user.lastName}`}
                            </p>
                            <p>
                                Inscrit le <CreationDate date={user.createdAt} />
                            </p>
                            <p>
                                Suivie par {user.followers.length} personne
                            </p>
                        </div>
                        <div className='user-card__actions'>
                            {userId !== user.id &&
                                <FollowIcon
                                    user={user}
                                />
                            }
                            <Chip
                                icon={<AccountBoxIcon />}
                                label={'Voir le profil'}
                                variant="outlined"
                                onClick={() => navigateToProfile(user.id)}
                            />
                        </div>
                    </article>
                ))
            }
        </>
    )
}
