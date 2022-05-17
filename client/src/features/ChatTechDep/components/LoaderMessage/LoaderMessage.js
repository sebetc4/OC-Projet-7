import React from 'react'
import { GroupomaniaLogoSvg } from '../../../../components';

export default function LoaderMessage() {

    return (
        <div className='chat-tech-dep-box-message-u2'>
            <GroupomaniaLogoSvg className='chat-tech-dep-box-message-u2__avatar' />
            <span className="chat-tech-dep-box-message-u2__text">
                <div class="ellipsis one"></div>
                <div class="ellipsis two"></div>
                <div class="ellipsis three"></div>
            </span>
        </div>
    )
}
