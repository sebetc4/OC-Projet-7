import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';
import { Badge, Avatar } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function Conversation({ userId, conversation, onlineUsersId }) {

    const [otherUser, setOtherUser] = useState(null)
    const [otherUserIsOnline, setOtherUserIsOnline] = useState(false)

    useEffect(() => {
        if (conversation.firstUserId === userId)
            setOtherUser({ ...conversation.secondUser, id: conversation.secondUserId })
        else
            setOtherUser({ ...conversation.firstUser, id: conversation.firstUserId })
    }, [conversation, userId])

    useEffect(() => {
        if (otherUser) {
            setOtherUserIsOnline(onlineUsersId.includes(otherUser.id))
        }
    }, [otherUser, onlineUsersId])

    return (
        <>
            {
                otherUser &&
                <> {
                    otherUserIsOnline ?
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                alt={`Avatar de ${otherUser.firstName} ${otherUser.lastName}`}
                                src={otherUser.avatarUrl}
                            />
                        </StyledBadge>
                        :
                        <Avatar
                            alt={`Avatar de ${otherUser.firstName} ${otherUser.lastName}`}
                            src={otherUser.avatarUrl}
                        />
                }
                    <p className='chat-menu-content-conversation__name'>{`${otherUser.firstName} ${otherUser.lastName}`}</p>
                </>
            }
        </>
    )
}
