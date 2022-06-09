import React from 'react'

import { GroupomaniaLogoSvg } from '../../../../components';


export default function TechMessage({ message }) {

  return (
    <div className='chat-message chat-message--other-user'>
      <div className='chat-message-content chat-message-content--other-user'>
        <GroupomaniaLogoSvg className='chat-message-content__avatar chat-message-content__avatar--other-user' />
        <p className="chat-message-content__text chat-message-content__text--other-user">{message}</p>
      </div>
    </div>
  )
}
