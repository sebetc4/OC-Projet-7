import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { updateUser } from '../../../../../../store/actions/user.actions';
import { Button, TextField } from '@mui/material';
import { ConfirmModal } from '../../../../../../components';

export default function EmailForm({ user, closeAccordion }) {

    // Hooks
    const dispatch = useDispatch();

    // State
    const [showConfirmModale, setShowConfirmModale] = useState(false)
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)

    const toggleShowConfirmModale = () => setShowConfirmModale(!showConfirmModale)

    const settingsSchema = Yup.object().shape({
        email: Yup
            .string()
            .email("Mail non valide")
            .test('Unique', 'Adresse identique à l\'original', (values) => {
                return user.email !== values
            })
            .required("Champ requis"),
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
                email: user.email
            }}
            validationSchema={settingsSchema}
            validateOnBlur={true}
            validateOnChange={true}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, touched, values }) => (
                <Form onSubmit={handleSubmit} className='settings-form'>
                    <div className='settings-form-row'>
                        <Field
                            id='settings-email-form-email-input'
                            className='settings-form-row__inputs'
                            error={touched.email && !!errors.email}
                            as={TextField}
                            variant='outlined'
                            name={'email'}
                            type={'email'}
                            size="small"
                            label={'Adresse mail'}
                            helperText={<ErrorMessage name={'email'} />}
                        />
                    </div>
                    <div className='settings-form__button-container'>
                        <Button
                            variant='contained'
                            onClick={toggleShowConfirmModale}
                            disabled={!(isValid && !isSubmitting && values.email !== user.email)}
                        >
                            Modifier
                        </Button>
                    </div>
                    <ConfirmModal
                        title={'Confirmer la modification de l\'adresse mail'}
                        content={`Votre nouvelle adresse mail: ${values.email}`}
                        button='Valider'
                        showConfirmModale={showConfirmModale}
                        toggleShowConfirmModale={toggleShowConfirmModale}
                        onClickConfirm={handleSubmit}
                        isLoading={formIsSubmitting}
                    />
                </Form>
            )}
        </Formik>
    )
}
