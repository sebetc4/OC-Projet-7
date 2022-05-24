import React, { useState, forwardRef } from 'react'
import { PostForm } from '../../../../components/PostList/components'

import AddIcon from '@mui/icons-material/Add';
import { Fab, Dialog, Slide, useMediaQuery } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatePost() {

    // Hooks
	const fullScreen = useMediaQuery('(max-width:768px)');

    // State
    const [displayCreatePost, setDisplayCreatePost] = useState(false)

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
