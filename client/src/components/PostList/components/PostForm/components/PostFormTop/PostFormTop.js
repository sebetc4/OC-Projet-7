import React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function PostFormTop({ type, closeModal, submitting }) {
    return (
        <div className='post-form-top'>
            <h2>{`${type === 'modify' ? 'Modifier la' : 'Ajouter une'} publication`}</h2>
            <div className='post-form-top__button-container'>
                <IconButton
                    color="error"
                    aria-label="Retour"
                    onClick={closeModal}
                    disabled={submitting}
                >
                    <CloseIcon color='error' fontSize='medium' />
                </IconButton>
            </div>
        </div>
    )
}
