import React from 'react'
import { useDispatch } from "react-redux";
import { MenuModal } from '../../../../../../../../components'
import { deletePost } from '../../../../../../../../store/actions/posts.actions';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function PostSettings({ closeModal, postId, postIndex, toggleDisplayModifyPost }) {

    const dispatch = useDispatch()

    const handleDeletePost = () => dispatch(deletePost(postId, postIndex))

    return (
        <MenuModal closeModal={closeModal}>
            <div className='post-card-settings'>
                <Paper sx={{ width: 200 }}>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                toggleDisplayModifyPost()
                                closeModal()
                            }}
                        >
                            <ListItemIcon>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Modifier</ListItemText>
                        </MenuItem>
                        <Divider className='post-card-settings__divider'/>
                        <MenuItem
                            onClick={() => {
                                handleDeletePost()
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
    )
}
