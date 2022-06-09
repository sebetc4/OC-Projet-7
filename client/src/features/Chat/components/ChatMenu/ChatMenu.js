import React from 'react'

import { Box, Fab } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import { ChatUserCard } from '../index';


export default function ChatMenu({ deviceSize, setShowChatBox, user, conversations, setCurrentChat, toggleShowSearchUser, onlineUsersId }) {

    return (
        <>
            {
                deviceSize !== 0 &&
                <Box
                    component="div"
                    sx={{
                        backgroundColor: 'background.top',
                    }}
                    className='chat-menu-top'>
                    <h2>Vos discussions</h2>
                </Box>
            }
            {
                conversations.length !== 0 ?
                    <ul className='chat-menu-content'>
                        {
                            conversations.map(conversation =>
                                <li
                                    key={conversation.id}
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
                                </li>
                            )
                        }
                    </ul>
                    :
                    <div className='chat-menu-no-conversation'>
                        <p>Aucune conversations</p>
                    </div>
            }
            {
                deviceSize !== 0 &&
                <Fab
                    color='secondary'
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
