import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";
import { Button, TextField } from '@mui/material';
import * as Yup from "yup";

import customPasswordInput from "../utils/customPasswordInput";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function FormSignIn(props) {

    // State
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword)

    const userSchema = Yup.object().shape({
        firstName: Yup.string().min(2, "Trop court! 2 caractères minimum").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
        lastName: Yup.string().min(2, "Trop court! 2 caractères minimum").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
        email: Yup.string().email("Mail non valide").required("Champ requis"),
        password: Yup.string().min(6, "Trop court! 6 caractères minimum").required("Champ requis"),
    });

    const submit = (values, actions) => {
        axios.post(`api/user/register`, values)
            .then((res) => {
                props.handleLogin(res.data.userId)
                actions.setSubmitting(false);
            })
            .catch((err) => {
                if (err.response) {
                    actions.setFieldError(err.response.data.path, err.response.data.error);
                    actions.setSubmitting(false);
                }
            });
    };

    return (
        <div className="login-form-modal-content">
            <div className="login-form-modal-content__top">
                <h2>Inscription</h2>
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
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
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
                                id='signup-form-firstname-input'
                                error={touched.firstName && !!errors.firstName}
                                as={TextField}
                                variant='filled'
                                name={'firstName'}
                                type={'text'}
                                size="small"
                                label={'Prénom'}
                                helperText={<ErrorMessage name={'firstName'} />}
                            />
                        </div>
                        <div className="login-form-row">
                            <Field
                                color='secondary'
                                className='login-form-row__input'
                                id='signup-form-lastname-input'
                                error={touched.lastName && !!errors.lastName}
                                as={TextField}
                                variant='filled'
                                name={'lastName'}
                                type={'text'}
                                size="small"
                                label={'Nom'}
                                helperText={<ErrorMessage name={'lastName'} />}
                            />
                        </div>
                        <div className="login-form-row">
                            <Field
                                color='secondary'
                                className='login-form-row__input'
                                id='signup-form-email-input'
                                error={touched.email && !!errors.email}
                                as={TextField}
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
                                id='signup-form-password-input'
                                className='login-form-row__input'
                                name={'password'}
                                label={'Mot de passe'}
                                component={customPasswordInput}
                                error={!!errors.password && touched.password}
                                showPassword={showPassword}
                                toggleShowPassword={toggleShowPassword}
                            />
                        </div>
                        <div className='login-form__button-container'>
                            <Button
                                color='secondary'
                                variant='contained'
                                type='submit'
                                disabled={!(isValid && !isSubmitting && dirty)}
                            >
                                S'inscrire
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <p className="login-form-modal-content__text">
                Déjà inscrit ?
                <span className="login-form-modal-content__link" onClick={props.handleModal}>
                    Connectez-vous !
                </span>
            </p>
        </div>
    );
}
