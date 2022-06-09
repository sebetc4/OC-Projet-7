import React, { useState, useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function PostFormVideoInput({ type, post, video, setVideo, setVideoUrl, toggleShowVideoInput }) {

    const textFieldRef = useRef()

    const [addVideoDisabled, setAddVideoDisabled] = useState(true)

    useEffect(() => {
        if (video.includes('https://www.youtube') || video.includes('https://youtube')) {
            setAddVideoDisabled(false)
        } else {
            setAddVideoDisabled(true)
        }
    }, [video])

    const handleVideo = (e) => setVideo(e.target.value)

    const handleAddVideo = () => {
        setVideoUrl(video.replace('watch?v=', 'embed/').split('&')[0])
        toggleShowVideoInput()
    }

    return (
        <div className='post-form-video-input'>
            <TextField
                color='secondary'
                ref={textFieldRef}
                className='post-form-video-input__input-container'
                id={type !== 'modify' ? 'post-video-input-new-post' : `post-video-input-${post.id}`}
                sx={{ width: '100%' }}
                size='small'
                label='URL de la vidéo youtube'
                variant="outlined"
                value={video}
                onChange={handleVideo}
            />
            <Button
                color='primary'
                startIcon={<AddIcon />}
                size='small'
                onClick={handleAddVideo}
                variant="contained"
                disabled={addVideoDisabled}
            >
                Ajouter
            </Button>
        </div>
    )
}
