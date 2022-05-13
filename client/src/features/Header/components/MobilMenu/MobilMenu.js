import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../../store/actions/user.actions';

import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


export default function MobilMenu({ toggleDisplayMobileMenu, displayMobileMenu }) {

    const dispatch = useDispatch()

    const userId = useSelector((state) => state.user.data.id)

    useEffect(() => {
        if (displayMobileMenu)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset'
        return () => document.body.style.overflow = 'unset';
    }, [displayMobileMenu])
    return (
        <nav id="mobil-menu" className={`mobil-menu ${displayMobileMenu ? 'mobil-menu-open' : 'mobil-menu-close'}`}>
            <ul>
                <li>
                    <NavLink to='/feeds' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="primary"
                            aria-label="Feed"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <DynamicFeedIcon fontSize='large' />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/home' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="primary"
                            aria-label="Acceuil"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <HomeIcon fontSize='large' />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/profile/${userId}`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="primary"
                            aria-label="Profil"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <PersonIcon fontSize='large' />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/settings`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <SettingsIcon fontSize="large" />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <IconButton onClick={() => dispatch(logoutUser())} className='navbar__nav-link' >
                        <LogoutIcon fontSize="large" />
                    </IconButton>
                </li>
            </ul>
            <div onClick={toggleDisplayMobileMenu} className="bt-overlay" />
        </nav>
    )
}
