import React, { useEffect, useState } from 'react'
import { OnlineUserCard } from './components'

export default function OnlineUsers({ onlineUsers, user, handleOpenConversation }) {

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
            <div className='chat-online-users-top'>
                <h2>Utilisateurs en ligne</h2>
            </div>
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
                                            <OnlineUserCard
                                                key={onlineUser.userId}
                                                onlineUser={onlineUser}
                                                handleOpenConversation={handleOpenConversation}
                                            />
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
                                            <OnlineUserCard
                                                key={onlineUser.userId}
                                                onlineUser={onlineUser}
                                                handleOpenConversation={handleOpenConversation}
                                            />
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
