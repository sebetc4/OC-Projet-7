import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'

export default function ConfirmSignIn({ deviceSize, closeModal, handleModal }) {
    return (
        <div className='login-form-modal-content login-form-modal-content--confirm'>
            <div className="login-form-modal-content__top">
                <h2>Bienvenue!</h2>
                {
                    deviceSize === 0 &&
                    <IconButton
                        onClick={closeModal}
                        color='error'
                        size="large"
                    >
                        <CloseIcon />
                    </IconButton>
                }
            </div>
            <p className="login-form-modal-content__text">Pour accéder au contenu du site merci de vous connecter.</p>
            <div className='login-form__button-container login-form__button-container--confirm'>
                <Button
                    variant='contained'
                    onClick={handleModal} >
                    Connexion
                </Button>
            </div>
        </div>
    )
}
