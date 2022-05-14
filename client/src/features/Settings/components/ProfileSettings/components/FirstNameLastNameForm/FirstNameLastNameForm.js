import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';


import { updateUser } from '../../../../../../store/actions/user.actions';
import { ConfirmModal } from '../../../../../../components';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function EmailForm({ user, closeAccordion }) {
    
    // Hooks
    const dispatch = useDispatch();

    // State
    const [showConfirmModale, setShowConfirmModale] = useState(false)
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)

    const toggleShowConfirmModale = () => setShowConfirmModale(!showConfirmModale)

    const settingsSchema = Yup.object().shape({
        firstName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
        lastName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
    });

    const submit = async (values, actions) => {
        setFormIsSubmitting(true)
        try {
            const user = await axios.put(`/api/user`, values)
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
                firstName: user.firstName,
                lastName: user.lastName
            }}
            validationSchema={settingsSchema}
            validateOnBlur={true}
            validateOnChange={true}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, values }) => (
                <Form
                    onSubmit={handleSubmit}
                    className='settings-form'
                >
                    <div className='settings-form-row settings-form-row--double-inputs'>
                        <Field
                            className='settings-form-row__inputs'
                            error={errors.firstName}
                            as={TextField}
                            variant='outlined'
                            name={'firstName'}
                            type={'text'}
                            size="small"
                            label={'Prénom'}
                            helperText={<ErrorMessage name={'firstName'} />}
                        />
                        <Field
                            className='settings-form-row__inputs'
                            error={errors.lasttName}
                            as={TextField}
                            variant='outlined'
                            name={'lastName'}
                            type={'text'}
                            size="small"
                            label={'Nom'}
                            helperText={<ErrorMessage name={'lasttName'} />}
                        />
                    </div>
                    <div className='settings-form__button-container'>
                        <Button
                            variant='contained'
                            onClick={toggleShowConfirmModale}
                            disabled={!(isValid && !isSubmitting && (values.firstName !== user.firstName || values.lastName !== user.lastName))}
                        >
                            Modifier
                        </Button>
                    </div>
                    <ConfirmModal
                        title={'Confirmer la modification du nom et prénom'}
                        content={`Nouveau nom et prénom: ${values.firstName} ${values.lastName}`}
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
