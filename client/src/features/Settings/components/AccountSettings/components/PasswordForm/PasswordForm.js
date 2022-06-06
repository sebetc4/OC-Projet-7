import React, { useState } from 'react'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import { Button } from '@mui/material';

import customPasswordInput from '../utils/customPasswordInput'
import { ConfirmModal } from '../../../../../../components';


export default function PasswordForm({ closeAccordion }) {

    // State
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [showConfirmModale, setShowConfirmModale] = useState(false)
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)

    const toggleShowConfirmModale = () => setShowConfirmModale(!showConfirmModale)
    const toggleShowPassword = () => setShowPassword(!showPassword)
    const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword)
    const toggleShowConfirmNewPassword = () => setShowConfirmNewPassword(!showConfirmNewPassword)


    const settingsSchema = Yup.object().shape({
        password: Yup.string().min(6, "Veuillez entrer votre mot de passe").required("Champ requis"),
        newPassword: Yup.string().min(6, "Trop court! veuillez utiliser au moins 6 caractères").required("Champ requis"),
        confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Les mots de passe ne sont pas identiques').required("Champ requis")
    });

    const submit = async (values, actions) => {
        setFormIsSubmitting(true)
        try {
            const { password, newPassword } = values
            await axios.put(`/api/user/password`, { password, newPassword })
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
                password: '',
                newPassword: '',
                confirmNewPassword: ''
            }}
            validationSchema={settingsSchema}
            validateOnBlur={true}
            validateOnChange={true}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty, touched, values }) => (
                <Form onSubmit={handleSubmit} className='settings-form'>

                    <div className='settings-form-row'>
                        <Field
                            className='settings-form-row__inputs'
                            name={'password'}
                            label={'Mot de passe'}
                            component={customPasswordInput}
                            error={!!errors.password && touched.password}
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />
                    </div>

                    <div className='settings-form-row settings-form-row--double-inputs'>
                        <Field
                            className='settings-form-row__inputs'
                            name={'newPassword'}
                            label={'Nouveau mot de passe'}
                            component={customPasswordInput}
                            error={!!errors.newPassword && touched.newPassword}
                            showPassword={showNewPassword}
                            toggleShowPassword={toggleShowNewPassword}
                        />

                        <Field
                            className='settings-form-row__inputs'
                            name={'confirmNewPassword'}
                            label={'Confirmation du mot de passe'}
                            component={customPasswordInput}
                            error={!!errors.confirmNewPassword && touched.confirmNewPassword}
                            showPassword={showConfirmNewPassword}
                            toggleShowpassword={toggleShowConfirmNewPassword}
                        />
                    </div>
                    <div className='settings-form__button-container'>
                        <Button
                            variant='contained'
                            onClick={toggleShowConfirmModale}
                            disabled={!(isValid && !isSubmitting && dirty)}
                        >
                            Modifier
                        </Button>
                    </div>
                    <ConfirmModal
                        title={'Confirmer la modification du mot de passe'}
                        content={`Voulez vous vraiment modifier votre mot de passe?`}
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
