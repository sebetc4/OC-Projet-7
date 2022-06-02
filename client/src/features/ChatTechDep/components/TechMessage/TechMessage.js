import React from 'react'
import { GroupomaniaLogoSvg } from '../../../../components';


export default function TechMessage({ message }) {

  return (
    <div className='chat-tech-dep-message chat-tech-dep-message--other-user'>
      <div className='chat-tech-dep-message-content chat-tech-dep-message-content--other-user'>
        <GroupomaniaLogoSvg className='chat-tech-dep-message-content__avatar chat-tech-dep-message-content__avatar--other-user' />
        <p className="chat-tech-dep-message-content__text chat-tech-dep-message-content__text--other-user">{message}</p>
      </div>
    </div>
  )
}
