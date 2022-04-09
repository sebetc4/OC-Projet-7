import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";


export default function Navbar() {
  return (
    <div className='navbar'>
      <NavLink to='/home' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
      <NavLink to='/profil' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    </div>
  )
}
