import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material';
import { StyledBadge } from '../../../index';


export default function SearchUserCard({ userInResult, handleOpenConversation, onlineUsersId }) {

    // State
    const [userInResultIsOnline, setUserInResultIsOnline] = useState(false)

    // Chek if userInResult is online
    useEffect(() => {
        if (userInResult) {
            setUserInResultIsOnline(onlineUsersId.includes(userInResult.id))
        }
    }, [userInResult, onlineUsersId])

    return (
        <div
            key={userInResult.id}
            className='chat-search-user-card'
            onClick={() => handleOpenConversation(userInResult.id)}
        >
            {userInResultIsOnline ?
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar
                        alt={`Avatar de ${userInResult.firstName} ${userInResult.lastName}`}
                        src={userInResult.avatarUrl}
                    />
                </StyledBadge>
                :
                <Avatar
                    alt={`Avatar de ${userInResult.firstName} ${userInResult.lastName}`}
                    src={userInResult.avatarUrl}
                />
            }
            <p className='chat-search-user-card__name'>{`${userInResult.firstName} ${userInResult.lastName}`}</p>
        </div >
    )
}
