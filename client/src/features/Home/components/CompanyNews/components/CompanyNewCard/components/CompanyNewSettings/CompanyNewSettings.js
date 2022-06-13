import React from 'react'

import { MenuModal } from '../../../../../../../../components'

import {Divider, Paper, MenuList, MenuItem, ListItemText, ListItemIcon  }  from '@mui/material';

import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';



export default function CommentSettings({ closeModal, handleDeleteCompanyNew, toggleShowDeleteConfirmModale }) {

    return (
        <MenuModal closeModal={closeModal}>
            <div className='company-new-card-settings'>
                <Paper sx={{ width: 200 }}>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                toggleShowDeleteConfirmModale()
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
                                handleDeleteCompanyNew()
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
