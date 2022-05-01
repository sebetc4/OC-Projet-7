import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';


export default function PostFormVideoInput({ setVideo, handleVideoUrl }) {

    const [addVideoDisabled, setAddVideoDisabled] = useState(true)

    const handleVideo = (e) => {
        const url = e.target.value
        if (url.includes('https://www.youtube') || url.includes('https://youtube')) {
            let video = url.replace('watch?v=', 'embed/').split('&')[0]
            setVideo(video)
            setAddVideoDisabled(false)
        } else
            setAddVideoDisabled(true)
    }

    return (
        <div>
            <TextField
                id='post-video-input'
                size='small'
                label='URL de la vidéo youtube'
                variant="outlined"
                onChange={handleVideo}
            />
            <Button
                onClick={handleVideoUrl}
                variant="contained"
                disabled={addVideoDisabled}
            >
                Ajouter
            </Button>
        </div>
    )
}
