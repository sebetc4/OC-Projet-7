import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Alert, AlertTitle, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteError } from '../../store/actions/errors.actions';

export default function PostError() {

    // Hooks
    const dispatch = useDispatch()

    // Store
    const error = useSelector(state => state.errors.error)
    const invalidToken = useSelector(state => state.errors.invalidToken)

    const handleDeleteError = () => dispatch(deleteError())

    return (
        <>
            <Slide
                in={!!error && !invalidToken}
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
                            onClick={handleDeleteError}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    <AlertTitle>{error && error.title}</AlertTitle>
                    {error && error.message}
                </Alert>
            </Slide>
        </>

    )
}
