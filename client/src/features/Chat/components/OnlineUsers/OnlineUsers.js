import React, { useEffect, useState } from 'react'
import { ChatUserCard } from '../index'

export default function OnlineUsers({ deviceSize, onlineUsers, user, handleOpenConversation }) {

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
                <div className='chat-online-users-top'>
                    <h2>Utilisateurs en ligne</h2>
                </div>
            }

            <div className='chat-online-users-content'>
                {
                    (onlineFollowUsers.length !== 0 || onlineOtherUsers.length !== 0) ?
                        <>
                            {
                                onlineFollowUsers.length !== 0 &&
                                <>
                                    {
                                        onlineOtherUsers.length !== 0 && <h3>Utilisateur suivis:</h3>
                                    }
                                    {
                                        onlineFollowUsers.map(onlineUser =>
                                            <article
                                                key={onlineUser.userId}
                                                className='chat-user-card'
                                                onClick={() => handleOpenConversation({ ...onlineUser.data, id: onlineUser.userId })}
                                            >
                                                <ChatUserCard
                                                    key={onlineUser.userId}
                                                    userInCard={onlineUser.data}
                                                    userInCardIsOnline={true}
                                                    unreadMessages={0}
                                                />
                                            </article>
                                        )
                                    }
                                </>
                            }
                            {
                                onlineOtherUsers.length !== 0 &&
                                <>
                                    {
                                        onlineFollowUsers.length !== 0 && <h3>Autre utilisateur:</h3>
                                    }
                                    {
                                        onlineOtherUsers.map(onlineUser =>
                                            <article
                                                key={onlineUser.userId}
                                                className='chat-user-card'
                                                onClick={() => handleOpenConversation({ ...onlineUser.data, id: onlineUser.userId })}
                                            >
                                                <ChatUserCard
                                                    key={onlineUser.userId}
                                                    userInCard={onlineUser.data}
                                                    userInCardIsOnline={true}
                                                    unreadMessages={0}
                                                />
                                            </article>
                                        )
                                    }
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
