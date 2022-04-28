import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { logoutUser } from "../../../../store/actions/user.actions";
import MenuModal from '../../../../components/modals/MenuModal';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


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
