import React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function PostFormHeader({ type, closeModal }) {
    return (
        <div className='post-form-header'>
            <h2>{`${type === 'modify' ? 'Modifier la' : 'Ajouter une'} publication`}</h2>
            <div className='post-form-header__button-container'>
                <IconButton
                    color="error"
                    aria-label="Annuler"
                    onClick={closeModal}
                >
                    <CloseIcon color='error' fontSize='medium' />
                </IconButton>
            </div>
        </div>
    )
}