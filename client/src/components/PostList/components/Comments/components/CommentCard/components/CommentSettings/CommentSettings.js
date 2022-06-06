import React from 'react'
import { MenuModal } from '../../../../../../../../components'

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';


export default function CommentSettings({ closeModal, toggleShowModifyComment, toggleShowDeleteConfirmModale }) {

    return (
        <MenuModal closeModal={closeModal}>
            <div className='comment-card-settings'>
                <Paper sx={{ width: 200 }}>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                toggleShowModifyComment()
                                closeModal()
                            }}
                        >
                            <ListItemIcon>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Modifier</ListItemText>
                        </MenuItem>
                        <Divider className='comment-card-settings__divider'/>
                        <MenuItem
                            onClick={() => {
                                toggleShowDeleteConfirmModale()
                                closeModal()
                            }}
                        >
                            <ListItemIcon>
                                <DeleteOutlineOutlined />
                            </ListItemIcon>
                            <ListItemText>Supprimer</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </div >
        </MenuModal>
    )
}
