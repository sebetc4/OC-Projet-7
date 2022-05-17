import React from 'react'
import { GroupomaniaLogoSvg } from '../../../../components';


export default function TechMessage({ message }) {

  return (
    <div className='chat-tech-dep-box-message-u2'>
      <GroupomaniaLogoSvg className='chat-tech-dep-box-message-u2__avatar' />
      <span className="chat-tech-dep-box-message-u2__text">{message}</span>
    </div>
  )
}
