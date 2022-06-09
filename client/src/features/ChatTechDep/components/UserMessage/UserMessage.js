import React from 'react'

export default function UserMessage({ message, userAvatar }) {

    return (
        <div className='chat-message chat-message--user'>
            <div className='chat-message-content chat-message-content--user'>
                <p className="chat-message-content__text chat-message-content__text--user">{message}</p>
                <img
                    src={userAvatar}
                    alt="Avatar de l\'utilisateur"
                    className='chat-message-content__avatar chat-message-content__avatar--user'
                />
            </div>
        </div>
    )
}
