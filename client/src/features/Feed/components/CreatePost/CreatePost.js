import React, { useState, forwardRef } from 'react'
import { PostForm } from '../index'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatePost() {

    const theme = useTheme();

    const [displayCreatePost, setDisplayCreatePost] = useState(false)

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDisplayCreatePost = () => setDisplayCreatePost(!displayCreatePost)

    return (
        <div className='create-post'>
            <Fab
                onClick={toggleDisplayCreatePost}
                color="primary"
                variant="extended"
            >
                <AddIcon sx={{ mr: 2 }} />
                Ajouter une publication
            </Fab>
            <Dialog
                open={displayCreatePost}
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                keepMounted
                maxWidth={'xl'}
                scroll={'body'}
            >
                <PostForm
                    closeModal={toggleDisplayCreatePost}
                    initialValueText={''}
                    initialValueVideoUrl={null}
                />
            </ Dialog>
        </div>


    )
}
