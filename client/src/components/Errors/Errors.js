import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import { Alert, AlertTitle, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function PostError() {

    const postError = useSelector(state => state.posts.error)
    const todosError = useSelector(state => state.todos.error)


    const [showError, setShowError] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (postError)
            setError(postError)
        else if (todosError)
            setError(todosError)
    }, [postError, todosError])

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
                className='errors'
                severity="error"
                action={
                    <IconButton
                        aria-label="Fermer"
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
