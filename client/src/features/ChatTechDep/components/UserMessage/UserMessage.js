import React from 'react'

export default function UserMessage({ message, userAvatar }) {
    return (
        <div className='chat-tech-dep-message chat-tech-dep-message--user'>
            <div className='chat-tech-dep-message-content chat-tech-dep-message-content--user'>
                <p className="chat-tech-dep-message-content__text chat-tech-dep-message-content__text--user">{message}</p>
                <img
                    src={userAvatar}
                    alt="Avatar de l\'utilisateur"
                    className='chat-tech-dep-message-content__avatar chat-tech-dep-message-content__avatar--user'
                />
            </div>
        </div>
    )
}
