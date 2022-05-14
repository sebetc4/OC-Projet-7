import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from 'axios';


import { updateUser } from '../../../../../../store/actions/user.actions';
import { ConfirmModal } from '../../../../../../components';

import { Button, TextareaAutosize } from '@mui/material';


export default function BiographyForm({ user, closeAccordion }) {

    // Hooks
    const dispatch = useDispatch();

    // State
    const [bio, setBio] = useState(user.bio ? user.bio : '')
    const [bioLenght, setBioLenght] = useState(0)
    const [showConfirmModale, setShowConfirmModale] = useState(false)
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)

    const toggleShowConfirmModale = () => setShowConfirmModale(!showConfirmModale)

    useEffect(() => {
        setBioLenght(bio.length)
    }, [bio])

    const submit = async (values, actions) => {
        setFormIsSubmitting(true)
        try {
            const user = await axios.put(`/api/user`, { bio: bio })
            dispatch(updateUser(user.data))
            closeAccordion()
        } catch (err) {
            if (err.response)
                actions.setFieldError(err.response.data.path, err.response.data.error)
        }
        setFormIsSubmitting(false)
        toggleShowConfirmModale()
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                bio: user.bio,
            }}
            validateOnBlur={true}
            validateOnChange={true}
        >
            {({ handleSubmit }) => (
                <Form
                    onSubmit={handleSubmit}
                    className='settings-form'
                >
                    <div className='settings-form-row'>
                        <TextareaAutosize
                            maxLength={500}
                            maxRows={5}
                            className='settings-form-textarea'
                            name='bio'
                            value={bio}
                            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder='Votre biographie...'
                        />
                        <p className={`settings-form-textarea-counter${bioLenght >= 500 ? ' settings-form-textarea-counter--error' : ''}`}>
                            {bioLenght}/500 caractères
                        </p>
                    </div>
                    <div className='settings-form__button-container'>
                        <Button
                            variant='contained'
                            onClick={toggleShowConfirmModale}
                            disabled={bio === user.bio}
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
                        onClickConfirm={handleSubmit}
                        isLoading={formIsSubmitting}
                    />
                </Form>
            )}
        </Formik>)
}
