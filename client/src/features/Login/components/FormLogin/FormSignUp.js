import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { customInput, customError } from "./models";

export default function FormSignIn(props) {
    const userSchema = Yup.object().shape({
        firstName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
        lastName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
        email: Yup.string().email("Mail non valide").required("Champ requis"),
        password: Yup.string().min(6, "Trop court! veuillez utiliser au moins 6 caractères").required("Champ requis"),
    });

    const submit = async (values, actions) => {
        await axios
            .post(`api/user/register`, values)
            .then((res) => {
                props.handleLogin(res.data.userId)
            })
            .catch((err) => {
                if (err.response) {
                    actions.setFieldError(err.response.data.path, err.response.data.error);
                }
            });
        actions.setSubmitting(false);
    };

    return (
        <div className="login-modale-content">
            <h2 className="login-modale-content__title">Inscription</h2>
            <Formik
                onSubmit={submit}
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                validationSchema={userSchema}
                validateOnBlur={true}
                validateOnChange={false}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form className="login-form" onSubmit={handleSubmit}>
                        <Field name="firstName" component={customInput} type="text" placeholder="Prénom" />
                        <ErrorMessage name="firstName" component={customError} />
                        <Field name="lastName" component={customInput} type="text" placeholder="Nom" />
                        <ErrorMessage name="lastName" component={customError} />
                        <Field name="email" component={customInput} type="email" placeholder="Email" />
                        <ErrorMessage name="email" component={customError} />
                        <Field name="password" component={customInput} type="password" placeholder="Mot de passe" />
                        <ErrorMessage name="password" component={customError} />
                        <button type="submit" className="login-form__button" disabled={isSubmitting}>
                            S'inscrire
                        </button>
                    </form>
                )}
            </Formik>
            <p className="login-modale-content__text">
                Déjà inscrit?
                <span className="login-modale-content__link" onClick={props.handleModal}>
                    Connectez vous!
                </span>
            </p>
        </div>
    );
}
