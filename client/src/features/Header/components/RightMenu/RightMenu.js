import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux'
import { logoutUser } from "../../../../store/actions/user.actions";
import MenuModal from '../../../../components/modals/MenuModal';


export default function SettingsBar() {

    const [displayModalSettings, setDisplayModalSettings] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userAvatar = useSelector((state) => state.user.data.avatarUrl)

    const navigateToSettings = () => {
        navigate('/settings', { replace: true })
        toggleDisplayModalSettings()
    }

    const toggleDisplayModalSettings = () => setDisplayModalSettings(!displayModalSettings)

    return (
        <div className='right-menu'>

            <button
                className='right-menu__button'
                onClick={toggleDisplayModalSettings}
            >
                <img
                    alt={'avatar de l\'ustilisateur'}
                    src={userAvatar} 
                />
            </button>
            {displayModalSettings &&
                <MenuModal
                    closeModal={toggleDisplayModalSettings}
                >
                    <div className='right-menu-modal'>

                        <button
                            onClick={navigateToSettings}
                            className='right-menu-modal__button'
                        >
                            <FontAwesomeIcon icon={faGear} />
                            <span>Réglages</span>
                        </button>

                        <hr className='right-menu-modal__hr' />

                        <button
                            className='right-menu-modal__button'
                            onClick={() => dispatch(logoutUser())}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span>Déconnexion</span>
                        </button>

                    </div>
                </MenuModal>
            }
        </div >
    )
}
