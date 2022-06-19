import React, { useEffect, useState } from 'react'

import { Box, Divider } from '@mui/material'

import { ChatUserCard } from '../index'

export default function OnlineUsers({ deviceSize, setShowChatBox, onlineUsers, user, handleOpenConversation }) {

    // State
    const [onlineFollowUsers, setOnlineFollowUsers] = useState([])
    const [onlineOtherUsers, setOnlineOtherUsers] = useState([])

    useEffect(() => {
        const followingUsers = []
        const otherUsers = []
        const followingUsersId = user.following.map(fol => fol.id)
        onlineUsers.forEach(onlineUser => {
            if (followingUsersId.includes(onlineUser.userId))
                followingUsers.push(onlineUser)
            else if (onlineUser.userId !== user.id)
                otherUsers.push(onlineUser)
        })
        setOnlineFollowUsers(followingUsers)
        setOnlineOtherUsers(otherUsers)
    }, [user, onlineUsers])
    return (
        <>
            {
                deviceSize !== 0 &&
                <Box
                    component="div"
                    sx={{
                        backgroundColor: 'background.top',
                    }}
                    className='chat-online-users-top'
                >
                    <h2>Utilisateurs en ligne</h2>
                </Box>
            }

            <div className='chat-online-users-content'>
                {
                    (onlineFollowUsers.length !== 0 || onlineOtherUsers.length !== 0) ?
                        <>
                            {
                                onlineFollowUsers.length !== 0 &&
                                <>
                                    {
                                        onlineOtherUsers.length !== 0 && <h3>Utilisateurs suivis:</h3>
                                    }
                                    <ul>
                                        {
                                            onlineFollowUsers.map(onlineUser =>
                                                <li
                                                    key={onlineUser.userId}
                                                    onClick={() => {
                                                        handleOpenConversation({ ...onlineUser.data, id: onlineUser.userId })
                                                        deviceSize === 0 && setShowChatBox(true)
                                                }}
                                                >
                                                    <ChatUserCard
                                                        userInCard={onlineUser.data}
                                                        userInCardIsOnline={true}
                                                        unreadMessages={0}
                                                    />
                                                </li>
                                            )
                                        }
                                    </ul>
                                </>
                            }
                            {
                                (onlineFollowUsers.length !== 0 && onlineOtherUsers.length !== 0) &&
                                <Divider className='chat-online-users-content__divider'/>
                            }
                            {
                                onlineOtherUsers.length !== 0 &&
                                <>
                                    {
                                        onlineFollowUsers.length !== 0 && <h3>Autres utilisateurs:</h3>
                                    }
                                    <ul>
                                        {
                                            onlineOtherUsers.map(onlineUser =>
                                                <li
                                                    key={onlineUser.userId}
                                                    onClick={() => handleOpenConversation({ ...onlineUser.data, id: onlineUser.userId })}
                                                >
                                                    <ChatUserCard
                                                        userInCard={onlineUser.data}
                                                        userInCardIsOnline={true}
                                                        unreadMessages={0}
                                                    />
                                                </li>
                                            )
                                        }
                                    </ul>
                                </>
                            }
                        </>
                        :
                        <div className='chat-online-users-no-users'>
                            <p>Aucun utilisateur en ligne</p>
                        </div>
                }
            </div>
        </>

    )
}
