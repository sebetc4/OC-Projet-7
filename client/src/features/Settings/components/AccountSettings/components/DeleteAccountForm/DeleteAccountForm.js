import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import { Button } from '@mui/material';

import customPasswordInput from '../utils/customPasswordInput'
import { logoutUser } from '../../../../../../store/actions/user.actions';
import { ConfirmModal } from '../../../../../../components';


export default function DeleteAccountForm({closeAccordion}) {

    // Hooks
    const dispatch = useDispatch();

    // State
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [showConfirmModale, setShowConfirmModale] = useState(false)
    const [formIsSubmitting, setFormIsSubmitting] = useState(false)


    const toggleShowPassword = () => setShowPassword(!showPassword)
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)
    const toggleShowConfirmModale = () => setShowConfirmModale(!showConfirmModale)

    const settingsSchema = Yup.object().shape({
        password: Yup.string().min(6, "Veuillez entrer votre mot de passe").required("Champ requis"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne sont pas identiques').required("Champ requis")
    });

    const submit = async (values, actions) => {
        setFormIsSubmitting(true)
        try {
            const password = values.password
            await axios.post('/api/auth/check-password', { password })
            await axios.delete(`/api/user`)
            dispatch(logoutUser())
        } catch (err) {
            if (err.response)
                actions.setFieldError(err.response.data.path, err.response.data.error)
        }
        actions.setSubmitting(false);
        toggleShowConfirmModale()
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                password: '',
                confirmPassword: ''
            }}
            validationSchema={settingsSchema}
            validateOnBlur={true}
            validateOnChange={true}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty, touched }) => (
                <Form onSubmit={handleSubmit} className='settings-form'>
                    <div className='settings-form-row settings-form-row--double-inputs'>
                        <Field
                            name={'password'}
                            label={'Mot de passe'}
                            component={customPasswordInput}
                            error={!!errors.password && touched.password}
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />

                        <Field
                            className='settings-form-row__inputs'
                            name={'confirmPassword'}
                            label={'Confirmation du mot de passe'}
                            component={customPasswordInput}
                            error={!!errors.confirmPassword && touched.confirmPassword}
                            showPassword={showConfirmPassword}
                            toggleShowPassword={toggleShowConfirmPassword}
                        />
                    </div>
                    <div className='settings-form__button-container'>
                        <Button
                            variant='contained'
                            onClick={toggleShowConfirmModale}
                            disabled={!(isValid && !isSubmitting && dirty)}
                        >
                            Supprimer
                        </Button>
                    </div>
                    <ConfirmModal
                        title={'Confirmation de supression de compte'}
                        content={`Voulez vous vraiment supprimer votre compte, cette action est irréversible?`}
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
