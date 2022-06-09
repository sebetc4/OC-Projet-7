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
    const [showCreatePost, setShowCreatePost] = useState(false)

    const toggleShowCreatePost = () => setShowCreatePost(!showCreatePost)

    return (
        <div className='create-post'>
            <Fab
                onClick={toggleShowCreatePost}
                color="secondary"
                variant="extended"
            >
                <AddIcon sx={{ mr: 2 }} />
                Ajouter une publication
            </Fab>
            <Dialog
                open={showCreatePost}
                onClose={toggleShowCreatePost}
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                keepMounted
                maxWidth={'xl'}
                scroll={'body'}
            >
                <PostForm
                    closeModal={toggleShowCreatePost}
                    initialValueText={''}
                    initialValueVideoUrl={null}
                />
            </ Dialog>
        </div>


    )
}
