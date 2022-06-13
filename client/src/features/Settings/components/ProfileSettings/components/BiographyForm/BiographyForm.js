import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import api from '../../../../../../config/api.config';

import { updateUser } from '../../../../../../store/actions/user.actions';
import { ConfirmModal } from '../../../../../../components';

import { Button, TextareaAutosize } from '@mui/material';
import { setError } from '../../../../../../store/actions/errors.actions';


export default function BiographyForm({ user, closeAccordion }) {

    // Hooks
    const dispatch = useDispatch();

    // Store
    const deviceSize = useSelector(state => state.app.deviceSize)

    // State
    const [bio, setBio] = useState(user.bio ? user.bio : '')
    const [bioLength, setBioLength] = useState(0)
    const [showConfirmModale, setShowConfirmModale] = useState(false)
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)

    const toggleShowConfirmModale = () => setShowConfirmModale(!showConfirmModale)

    useEffect(() => {
        setBioLength(bio.length)
    }, [bio])

    const submit = async (values, actions) => {
        setFormIsSubmitting(true)
        try {
            const user = await api.put(`user`, { bio: bio })
            dispatch(updateUser(user.data))
            closeAccordion()
        } catch (err) {
            if (err.response.data.path && err.response.data.error)
                actions.setFieldError(err.response.data.path, err.response.data.error)
            else
                dispatch(setError({
                    title: 'Erreur du serveur',
                    message: 'Echec de l\'envoi du message'
                }))
        }
        setFormIsSubmitting(false)
        toggleShowConfirmModale()
    };

    return (
        <form
            className='settings-form'
            onSubmit={submit}
        >
            <div className='settings-form-textarea'>
                <label className='settings-form-textarea__label' htmlFor='settings-form-textarea'>Biographie</label>
                <TextareaAutosize
                    id='settings-form-textarea'
                    maxLength={500}
                    minRows={deviceSize !== 0 ? 1 : 3}
                    maxRows={5}
                    className='settings-form-textarea__input'
                    name='bio'
                    value={bio}
                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder='Votre biographie...'
                />
                <p className={`settings-form-textarea__counter${bioLength >= 500 ? ' settings-form-textarea__counter--error' : ''}`}>
                    {bioLength}/500 caractères
                </p>
            </div>
            <div className='settings-form__button-container'>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={toggleShowConfirmModale}
                    disabled={(bio === user.bio) || (!bio && !user.bio)}
                >
                    Modifier
                </Button>
            </div>
            <ConfirmModal
                title={'Confirmer la modification de la biographie'}
                content={`Voulez vous vraiment modifier votre biographie?`}
                button='Valider'
                showConfirmModale={showConfirmModale}
                toggleShowConfirmModale={toggleShowConfirmModale}
                onClickConfirm={submit}
                isLoading={formIsSubmitting}
            />
        </form>
    )
}
