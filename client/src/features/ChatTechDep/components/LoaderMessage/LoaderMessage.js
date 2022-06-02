import React from 'react'
import { GroupomaniaLogoSvg } from '../../../../components';

export default function LoaderMessage() {

    return (
        <div className='chat-tech-dep-message chat-tech-dep-message--other-user'>
            <div className='chat-tech-dep-message-content chat-tech-dep-message-content--other-user'>
                <GroupomaniaLogoSvg className='chat-tech-dep-message-content__avatar chat-tech-dep-message-content__avatar--other-user' />
                <span className="chat-tech-dep-message-content__text chat-tech-dep-message-content__text--other-user">
                    <div className="ellipsis one"></div>
                    <div className="ellipsis two"></div>
                    <div className="ellipsis three"></div>
                </span>
            </div>
        </div>
    )
}
