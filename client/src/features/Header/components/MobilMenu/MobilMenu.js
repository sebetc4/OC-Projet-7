import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faSquarePollHorizontal, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { toglleDisplayMenuMobile } from "../../../../store/actions/device.actions";
import { logoutUser } from "../../../../store/actions/user.actions";
import { useSelector, useDispatch } from 'react-redux';


export default function MobilMenu() {

    const dispatch = useDispatch()

    const [displayMenu, setDisplayMenu] = useState(false)

    const userId = useSelector((state) => state.user.data.id)

    const toggleDisplayMenu = () => {
        setDisplayMenu(!displayMenu)
        dispatch(toglleDisplayMenuMobile())
    }

    useEffect(() => {
        if (displayMenu)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset'
        return () => document.body.style.overflow = 'unset';
    }, [displayMenu])


    return (
        <nav id="mobil-menu" className={`mobil-menu ${displayMenu ? 'mobil-menu-open' : 'mobil-menu-close'}`}>
            <button className="mobil-menu-trigger" onClick={toggleDisplayMenu}><span>Menu</span></button>
            <ul>
                <li>
                    <NavLink to='/feeds' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <FontAwesomeIcon icon={faSquarePollHorizontal} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/home' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <FontAwesomeIcon icon={faHouse} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/profile/${userId}`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/settings`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                    <FontAwesomeIcon icon={faGear} />
                    </NavLink>
                </li>
                <li>
                    <button onClick={() => dispatch(logoutUser())} className='navbar__nav-link' >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </li>
            </ul>
            <div onClick={toggleDisplayMenu} class="bt-overlay"></div>
        </nav>
    )
}
