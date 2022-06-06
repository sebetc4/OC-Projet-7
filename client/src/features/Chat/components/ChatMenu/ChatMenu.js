import React, { useEffect } from 'react'

import { Fab } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import { ChatUserCard } from '../index';


export default function ChatMenu({ deviceSize, setShowChatBox, user, conversations, setCurrentChat, toggleShowSearchUser, onlineUsersId }) {

    useEffect(() => {

    })
    return (
        <>
            {
                deviceSize !== 0 &&
                <div className='chat-menu-top'>
                    <h2>Vos discussions</h2>
                </div>
            }
            {
                conversations.length !== 0 ?
                    <div className='chat-menu-content'>
                        {
                            conversations.map(conversation =>
                                <article
                                    key={conversation.id}
                                    className='chat-user-card'
                                    onClick={() => {
                                        setCurrentChat(conversation)
                                        deviceSize === 0 && setShowChatBox(true)
                                    }}
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
                                        unreadMessages={conversation.firstUserId === user.id ?
                                            conversation.unreadMessageFirstUser
                                            :
                                            conversation.unreadMessageSecondUser
                                        }
                                    />
                                </article>
                            )
                        }
                    </div>
                    :
                    <div className='chat-menu-no-conversation'>
                        <p>Aucune conversations</p>
                    </div>
            }
            {
                deviceSize !== 0 &&
                <Fab
                    color='primary'
                    aria-label='Rechercher un utilisateur'
                    onClick={toggleShowSearchUser}
                >
                    <PersonSearchIcon
                        fontSize='large'
                    />
                </Fab>
            }
        </>
    )
}
