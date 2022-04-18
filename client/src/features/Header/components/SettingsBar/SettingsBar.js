import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux'
import { logoutUser } from "../../../../store/actions/user.actions";


export default function SettingsBar() {

    const [modalSettings, setModalSettings] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userAvatar = useSelector((state) => state.user.data.avatarUrl)

    const navigateToSettings = () => {
        navigate('/settings', { replace: true })
        setModalSettings(false)
    }
    const handleLogout = () => dispatch(logoutUser())
    const toggleModalSettings = () => setModalSettings(!modalSettings)

    return (
        <div className='settings-bar'>
            <button className='settings-bar__button' onClick={toggleModalSettings}>
                <img alt={'avatar de l\'ustilisateur'} src={userAvatar} />
            </button>
            {modalSettings &&
                <div className='settings-bar-modal'>
                    <button onClick={navigateToSettings} className='settings-bar-modal__button' >
                        <FontAwesomeIcon icon={faGear} />
                        <span>Réglages</span>
                    </button>
                    <hr className='settings-bar-modal__hr' />
                    <button className='settings-bar-modal__button' onClick={handleLogout}>
                        <FontAwesomeIcon onClick={toggleModalSettings} icon={faRightFromBracket} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            }
        </div >
    )
}
