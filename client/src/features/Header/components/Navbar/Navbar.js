import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { ChatSvg } from '../../../../components';

export default function Navbar() {

  // Store
  const userId = useSelector((state) => state.user.data.id)


  return (
    <div className='navbar'>
      <NavLink tabIndex={-1} to='/feeds' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <IconButton color="primary" aria-label="Posts">
          <DynamicFeedIcon fontSize='large' />
        </IconButton>
      </NavLink>
      <NavLink tabIndex={-1} to='/home' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <IconButton color="primary" aria-label="Acceuil">
          <HomeIcon fontSize='large' />
        </IconButton>
      </NavLink>
      <NavLink tabIndex={-1} to={`/profile/${userId}`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <IconButton color="primary" aria-label="Profile">
          <PersonIcon fontSize='large'/>
        </IconButton>
      </NavLink>
      <NavLink tabIndex={-1}
      to={`/chat`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <IconButton color="primary" aria-label="Chat">
          <ChatSvg/>
        </IconButton>
      </NavLink>
    </div>
  )
}
