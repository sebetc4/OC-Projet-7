import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../../../store/actions/user.actions";


export default function SettingsBar() {

    const [modalSettings, setModalSettings] = useState(false)

    const dispatch = useDispatch();
    const handleLogout = () => { dispatch(logoutUser()) }

    const toggleModalSettings = () => { setModalSettings(!modalSettings) }
    return (
        <div className='settings-bar'>

            <button onClick={toggleModalSettings} className={ modalSettings ? "settings-bar__arrow active" : "settings-bar__arrow" } >
                <span class="settings-bar__arrow-left-bar"></span>
                <span class="settings-bar__arrow-right-bar"></span>
            </button>
            
            {modalSettings &&
                <div className='settings-bar-modal'>
                    <button className='settings-bar-modal__button' onClick={handleLogout}>
                        <FontAwesomeIcon className='' onClick={toggleModalSettings} icon={faRightFromBracket} />
                        <span>Déconnexion</span>
                    </button>
                    <hr className='settings-bar-modal__hr' />
                    <button className='settings-bar-modal__button' >
                        <FontAwesomeIcon icon={faGear} />
                        <span>Réglages</span>
                    </button>
                </div>


            }
        </div >


    )
}
