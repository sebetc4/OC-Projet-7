import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import api from '../../../../config/api.config';
import customPasswordInput from "../utils/customPasswordInput";
import { setError } from "../../../../store/actions/errors.actions";


export default function FormSignIn(props) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [showPassword, setShowPassword] = useState(false)
    const [accountDisabled, setAccountDisabled] = useState(false)

    const userSchema = Yup.object().shape({
        email: Yup.string().email("Mail non valide").required("Champ requis"),
        password: Yup.string().min(6, "Trop court").required("Champ requis"),
    });

    const submit = async (values, actions) => {
        try {
            setAccountDisabled(false)
            const res = await api.post(`auth/login`, values)
            props.handleLogin(res.data.userId)
            actions.setSubmitting(false);
        } catch (err) {
            if (err.response.data.path && err.response.data.error) {
                console.log('ttttttt')
                err.response.data.path === 'accountDisabled' ?
                    setAccountDisabled(true)
                    :
                    actions.setFieldError(err.response.data.path, err.response.data.error)
            }
            else
                dispatch(setError({
                    title: 'Erreur du serveur',
                    message: 'Echec de la connexion'
                }))
            actions.setSubmitting(false);
        }
    }

    const toggleShowPassword = () => setShowPassword(!showPassword)

    return (
        <div className="login-form-modal-content">
            <div className="login-form-modal-content__top">
                <h2>Connexion</h2>
                {
                    props.deviceSize === 0 &&
                    <IconButton
                        onClick={props.closeModal}
                        color='error'
                        size="large"
                    >
                        <CloseIcon />
                    </IconButton>
                }
            </div>
            <Formik
                onSubmit={submit}
                initialValues={{ email: "", password: "" }}
                validationSchema={userSchema}
                validateOnBlur={true}
                validateOnChange={true}
            >
                {({ handleSubmit, dirty, isSubmitting, errors, isValid, touched, values }) => (
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-form-row">
                            <Field
                                color='secondary'
                                className='login-form-row__input'
                                error={touched.email && !!errors.email}
                                as={TextField}
                                id='signin-form-email-input'
                                variant='filled'
                                name={'email'}
                                type={'email'}
                                size="small"
                                label={'Adresse mail'}
                                helperText={<ErrorMessage name={'email'} />}
                            />
                        </div>

                        <div className="login-form-row">
                            <Field
                                color='secondary'
                                className='login-form-row__input'
                                id='signin-form-password-input'
                                name={'password'}
                                label={'Mot de passe'}
                                component={customPasswordInput}
                                error={!!errors.password && touched.password}
                                showPassword={showPassword}
                                toggleShowPassword={toggleShowPassword}
                            />
                        </div>
                        {
                            accountDisabled &&
                            <p className='login-form__error' >Compte désactivé, merci de contacter un administrateur.</p>
                        }
                        <div className='login-form__button-container'>
                            <Button
                                color='secondary'
                                variant='contained'
                                type='submit'
                                disabled={!(isValid && !isSubmitting && dirty)}
                            >
                                Se connecter
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <p className="login-form-modal-content__text">
                Pas de compte ?
                <Button
                    color='secondary'
                    className="login-form-modal-content__button"
                    onClick={props.handleModal}
                >
                    Rejoignez-nous !
                </Button>
            </p>
        </div>
    );
}
