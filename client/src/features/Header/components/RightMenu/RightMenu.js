import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { logoutUser } from "../../../../store/actions/user.actions";
import MenuModal from '../../../../components/modals/MenuModal/MenuModal';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { toggleColorMode } from '../../../../store/actions/app.actions';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export default function SettingsBar() {

    // Store
    const userAvatar = useSelector((state) => state.user.data.avatarUrl)
    const colorMode = useSelector((state) => state.app.colorMode)

    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // State
    const [displayModalSettings, setDisplayModalSettings] = useState(false)

    const navigateToSettings = () => {
        navigate('/settings', { replace: true })
        toggleDisplayModalSettings()
    }

    const handleColorMode = () => dispatch(toggleColorMode())

    const toggleDisplayModalSettings = () => setDisplayModalSettings(!displayModalSettings)

    return (
        <div className='right-menu'>

            <IconButton
                className='right-menu__button-color-mode'
                onClick={handleColorMode}
                color='secondary'
                aria-label='Modifier le mode de couleur'
            >
                {colorMode === 'dark' ?
                    <Brightness7Icon color="toggleColorMode"/> 
                    :
                    <Brightness4Icon color="toggleColorMode"/>
                    }
            </IconButton>

            <IconButton
                className='right-menu__button-avatar'
                onClick={toggleDisplayModalSettings}
                color='secondary'
                aria-label='Paramètre et déconnexion'
            >
                <img
                    alt={'avatar de l\'ustilisateur'}
                    src={userAvatar}
                />
            </IconButton>
            {displayModalSettings &&
                <MenuModal
                    closeModal={toggleDisplayModalSettings}>
                    <div className='right-menu-modal'>
                        <Paper sx={{ width: 200, maxWidth: '100%' }}>
                            <MenuList>
                                <MenuItem
                                    onClick={navigateToSettings}
                                >
                                    <ListItemIcon>
                                        <SettingsIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Réglages</ListItemText>
                                </MenuItem>
                                <Divider className='right-menu-modal__divider' />
                                <MenuItem
                                    onClick={() => { dispatch(logoutUser()) }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Déconnexion</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Paper>
                    </div >
                </MenuModal>
            }
        </div >
    )
}
