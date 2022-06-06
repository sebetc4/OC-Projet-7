import React from 'react'
import { MenuModal } from '../../../../../../../../components'

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function PostCardSettings({ closeModal, toggleShowModifyPost, toggleShowDeleteConfirmModale }) {

    return (
        <>
            <MenuModal closeModal={closeModal}>
                <div className='post-card-settings'>
                    <Paper sx={{ width: 200 }}>
                        <MenuList>
                            <MenuItem
                                onClick={() => {
                                    toggleShowModifyPost()
                                    closeModal()
                                }}
                            >
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Modifier</ListItemText>
                            </MenuItem>
                            <Divider className='post-card-settings__divider' />
                            <MenuItem
                                onClick={() => {
                                    toggleShowDeleteConfirmModale()
                                    closeModal()
                                }}
                            >
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Supprimer</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </div >
            </MenuModal>
        </>
    )
}
