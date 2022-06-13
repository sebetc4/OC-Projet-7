import { Avatar } from '@mui/material'
import React from 'react'

import { FromNowDate } from '../../../../../../components'

export default function Message({ message, userIsSender }) {

    return (
        <div className='chat-message'>
            <div className={`chat-message-content chat-message-content--${userIsSender ? 'user' : 'other'}`}>
                {
                    userIsSender ?
                        <>
                            <p className="chat-message-content__text chat-message-content__text--user">{message.message}</p>
                            <img
                                src={message.User.avatarUrl}
                                alt="Votre avatar"
                                className='chat-message-content__avatar chat-message-content__avatar--user'
                            />
                        </>
                        :
                        <>
                            {message.User ?
                                <img
                                    src={message.User.avatarUrl}
                                    alt="Votre avatar"
                                    className='chat-message-content__avatar chat-message-content__avatar--other-user'
                                />
                                :
                                <Avatar />
                            }
                            <p className="chat-message-content__text chat-message-content__text--other-user">{message.message}</p>
                        </>
                }
            </div>
            <div className={`chat-message-bottom chat-message-bottom--${userIsSender ? 'user' : 'other'}`}>
                <FromNowDate
                    date={message.createdAt}
                    withoutUpdate={true}
                />
            </div>
        </div>
    )
}
