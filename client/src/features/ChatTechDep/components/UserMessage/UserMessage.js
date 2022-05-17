import React from 'react'

export default function UserMessage({message, userAvatar}) {
    return (
        <div className='chat-tech-dep-box-message-u1'>
            <span className="chat-tech-dep-box-message-u1__text">{message}</span>
            <img
                src={userAvatar}
                alt="Avatar de l\'utilisateur"
                className='chat-tech-dep-box-message-u1__avatar'
            />
        </div>
    )
}
