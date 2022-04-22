import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';

export default function Navbar() {

  // Store
  const userId = useSelector((state) => state.user.data.id)


  return (
    <div className='navbar'>
      <NavLink to='/feeds' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <FontAwesomeIcon icon={faSquarePollHorizontal} />
      </NavLink>
      <NavLink to='/home' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
      <NavLink to={`/profile/${userId}`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    </div>
  )
}
