import React from 'react'

import { Conversation } from './components';

import { Fab } from '@mui/material';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';


export default function ChatMenu({ user, conversations, setCurrentChat, toggleShowSearchUser }) {
    return (
        <>
            <div className='chat-menu-top'>
                <h2>Vos discussions</h2>
            </div>
            <div>
            </div>
            <div className='chat-menu-content'>
                {
                    conversations.map(conversation =>
                        <div
                            key={conversation.id}
                            className='chat-menu-content-conversation'
                            onClick={() => setCurrentChat(conversation)}
                        >
                            <Conversation
                                userId={user.id}
                                conversation={conversation}
                            />
                        </div>
                    )
                }
            </div>
            <div className='chat-menu-bottom'>
                <Fab 
                variant="extended" 
                color='primary'
                onClick={toggleShowSearchUser}
                >
                    <PersonSearchIcon sx={{ mr: 1 }} />
                    Chercher un utilisateur
                </Fab>
            </div>
        </>
    )
}
