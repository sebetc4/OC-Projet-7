import React, { useEffect } from 'react'

import { Conversation } from './components';

import { Fab } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import { ChatUserCard } from '../index';


export default function ChatMenu({ user, conversations, setCurrentChat, toggleShowSearchUser, onlineUsersId }) {

    useEffect(() => {

    })
    return (
        <>
            <div className='chat-menu-top'>
                <h2>Vos discussions</h2>
            </div>
            <div className='chat-menu-content'>
                {
                    conversations.map(conversation =>
                        <div
                            key={conversation.id}
                            className='chat-menu-content-conversation'
                            onClick={() => setCurrentChat(conversation)}
                        >
                            <ChatUserCard
                                userInCard={conversation.firstUserId === user.id ? 
                                    { ...conversation.secondUser, id: conversation.secondUserId }
                                    :
                                    { ...conversation.firstUser, id: conversation.firstUserId }
                                }
                                userInCardIsOnline={
                                    conversation.firstUserId === user.id ?
                                    onlineUsersId.includes(conversation.secondUserId)
                                    :
                                    onlineUsersId.includes(conversation.firstUserId)
                                }
                            />

                            <Conversation
                                userId={user.id}
                                conversation={conversation}
                                onlineUsersId={onlineUsersId}
                            />
                        </div>
                    )
                }
                <Fab
                    color='primary'
                    aria-label='Rechercher un utilisateur'
                    onClick={toggleShowSearchUser}
                >
                    <PersonSearchIcon
                        fontSize='large'
                    />
                </Fab>
            </div>
        </>
    )
}
