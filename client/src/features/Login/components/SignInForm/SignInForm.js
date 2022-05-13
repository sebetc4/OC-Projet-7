import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { Button, TextField } from '@mui/material';

import customPasswordInput from "../utils/customPasswordInput";


export default function FormSignIn(props) {

    // State
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword)

    const userSchema = Yup.object().shape({
        email: Yup.string().email("Mail non valide").required("Champ requis"),
        password: Yup.string().min(6, "Trop court").required("Champ requis"),
    });

    const submit = (values, actions) => {
        axios.post(`api/auth/login`, values)
            .then(res => {
                props.handleLogin(res.data.userId)
                actions.setSubmitting(false);
            })
            .catch(err => {
                if (err.response)
                    actions.setFieldError(err.response.data.path, err.response.data.error)
                actions.setSubmitting(false);
            })
    }


return (
    <div className="login-form-modal-content">
        <h2 className="login-form-modal-content__title">Connexion</h2>
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
                            className='login-form-row__input'
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
            Pas de compte?
            <span className="login-form-modal-content__link" onClick={props.handleModal}>
                Rejoignez nous!
            </span>
        </p>
    </div>
);
}
