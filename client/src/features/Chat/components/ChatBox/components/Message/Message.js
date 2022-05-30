import React from 'react'
import { FromNowDate } from '../../../../../../components'

export default function Message({ message, userIsSender }) {
    return (
        <div className='message'>
            <div className='message-top'>
                <span className="chat-tech-dep-box-message-u1__text">{message.message}</span>
                <img
                    src={message.User.avatarUrl}
                    alt="Avatar de l\'utilisateur"
                    className='chat-tech-dep-box-message-u1__avatar'
                />
            </div>

            <div className='message-bottom'>
                <FromNowDate
                    date={message.createdAt}
                    withoutUpdate={true}
                />
            </div>
        </div>
    )
}
