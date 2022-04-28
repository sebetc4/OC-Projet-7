import React from 'react'
import { useDispatch } from "react-redux";
import { MenuModal } from '../../../../../../../../components'
import { deleteCommentPost, deletePost } from '../../../../../../../../store/actions/posts.actions';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function CommentSettings({ closeModal, commentId, commentIndex, postIndex, toggleDisplayModifyComment }) {

    const dispatch = useDispatch()

    const handleDeleteComment = () => dispatch(deleteCommentPost(commentId, commentIndex, postIndex))

    return (
        <MenuModal closeModal={closeModal}>
            <div className='post-comment-card-settings'>
                <Paper sx={{ width: 200 }}>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                toggleDisplayModifyComment()
                                closeModal()
                            }}
                        >
                            <ListItemIcon>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Modifier</ListItemText>
                        </MenuItem>
                        <Divider className='post-comment-card-settings__divider'/>
                        <MenuItem
                            onClick={() => {
                                handleDeleteComment()
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
