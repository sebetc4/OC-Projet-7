import React from 'react'

import { GroupomaniaLogoSvg } from '../../../../components';

export default function LoaderMessage() {

    return (
        <div className='chat-message chat-message--other-user'>
            <div className='chat-message-content chat-message-content--other-user'>
                <GroupomaniaLogoSvg className='chat-message-content__avatar chat-message-content__avatar--other-user' />
                <span className="chat-message-content__text chat-message-content__text--other-user">
                    <div className="ellipsis one"></div>
                    <div className="ellipsis two"></div>
                    <div className="ellipsis three"></div>
                </span>
            </div>
        </div>
    )
}
