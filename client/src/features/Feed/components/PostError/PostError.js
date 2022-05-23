import React, { useEffect, useState } from 'react'

import { Alert, AlertTitle, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function PostError({ error }) {

    const [showError, setShowError] = useState(false)

    useEffect(() => {
        if (error)
            setShowError(true)
        else
            setShowError(false)
    }, [error])

    return (
        <Slide
            in={showError}
            direction="up"
        >
            <Alert
                className='feed-error'
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setShowError(false)}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                <AlertTitle>Erreur de serveur</AlertTitle>
                {error} - <strong>Veuillez réessayer ultérieurement.</strong>
            </Alert>
        </Slide>
    )
}
