import React from 'react'
import { FromNowDate } from '../../../../../../components'

export default function Message({ message, userIsSender }) {
    return (
        <div className={`chat-box-message chat-box-message--${userIsSender ? 'user' : 'other'}`}>
            <div className={`chat-box-message-content chat-box-message-content--${userIsSender ? 'user' : 'other'}`}>
                {
                    userIsSender ?
                        <>
                            <p className="chat-tech-dep-message-content__text chat-tech-dep-message-content__text--user">{message.message}</p>
                            <img
                                src={message.User.avatarUrl}
                                alt="Votre avatar"
                                className='chat-tech-dep-message-content__avatar chat-tech-dep-message-content__avatar--user'
                            />
                        </>
                        :
                        <>
                            <img
                                src={message.User.avatarUrl}
                                alt="Votre avatar"
                                className='chat-tech-dep-message-content__avatar chat-tech-dep-message-content__avatar--other-user'
                            />
                            <p className="chat-tech-dep-message-content__text chat-tech-dep-message-content__text--other-user">{message.message}</p>
                        </>
                }
            </div>
            <div className={`chat-box-message-bottom chat-box-message-bottom--${userIsSender ? 'user' : 'other'}`}>
                <FromNowDate
                    date={message.createdAt}
                    withoutUpdate={true}
                />
            </div>
        </div>
    )
}
