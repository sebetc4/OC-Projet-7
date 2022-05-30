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

export default function Conversation({ userId, conversation }) {

    const [userConversation, setUser] = useState(null)
    const [userConversationIsOnline, setUserConversationIsOnline] = useState(false)

    useEffect(() => {
        if (conversation.firstUserId === userId)
            setUser(conversation.secondUser)
        else
            setUser(conversation.firstUser)
    }, [conversation, userId])

    return (
        <>
            {
                userConversation &&
                <>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            alt={`Avatar de ${userConversation.firstName} ${userConversation.lastName}`}
                            src={userConversation.avatarUrl}
                        />
                    </StyledBadge>
                    <p className='chat-menu-content-conversation__name'>{`${userConversation.firstName} ${userConversation.lastName}`}</p>
                </>
            }
        </>
    )
}
