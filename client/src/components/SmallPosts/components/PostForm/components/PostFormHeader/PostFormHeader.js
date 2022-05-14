import React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function PostFormHeader({ type, closeModal }) {
    return (
        <div className='post-form-header'>
            <div> </div>
            <h2>{`${type === 'modify' ? 'Modifier la' : 'Ajouter une'} publication`}</h2>
            <IconButton
                color="warning"
                aria-label="Annuler"
                onClick={closeModal}
            >
                <CloseIcon color='error' fontSize='medium' />
            </IconButton>
        </div>
    )
}
