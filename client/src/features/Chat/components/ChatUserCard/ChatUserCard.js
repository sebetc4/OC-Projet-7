import React from 'react'

import { styled } from '@mui/material/styles';
import { Badge, Avatar, Box } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

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

export default function ChatUserCard({ userInCard, userInCardIsOnline, unreadMessages }) {

    return (
        <Box
            component="article"
            sx={{
                backgroundColor: 'background.article',
            }}
            className='chat-user-card'>
            {
                userInCardIsOnline ?
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            alt={`Avatar de ${userInCard.firstName} ${userInCard.lastName}`}
                            src={userInCard.avatarUrl}
                        />
                    </StyledBadge>
                    :
                    <Avatar
                        alt={`Avatar de ${userInCard.firstName} ${userInCard.lastName}`}
                        src={userInCard.avatarUrl}
                    />
            }
            <p className='chat-user-card__name'>{`${userInCard.firstName} ${userInCard.lastName}`}</p>
            {unreadMessages !== 0 &&
                <div className='chat-user-card__new-message'>
                    <Badge badgeContent={unreadMessages} color="primary">
                        <ChatBubbleOutlineIcon color="action" />
                    </Badge>
                </div>
            }
        </Box>
    )
}

