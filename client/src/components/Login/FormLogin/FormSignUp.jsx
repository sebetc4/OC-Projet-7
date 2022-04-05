import { Formik, Field, ErrorMessage } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";
import { customInput, customError } from "./models";
import "axios";
import axios from "axios";

export default class FormSignIn extends Component {
    userSchema = Yup.object().shape({
        username: Yup.string().min(6, "Trop court! veuillez utiliser au moins 6 caractères").required("Champ requis"),
        email: Yup.string().email("Mail non valide").required("Champ requis"),
        password: Yup.string().min(6, "Trop court! veuillez utiliser au moins 6 caractères").required("Champ requis"),
    });

    submit = (values, actions) => {
        actions.setSubmitting(false);
        axios
            .post(`api/user/register`, values)
            .then(res => {
                console.log(res.data);
            })
            .catch((err) => {
                if (err.response) {
                    actions.setFieldError(err.response.data.path, err.response.data.error);
                }
            });
    };

    render() {
        return (
            <div className="login-modale-content">
                <h2 className="login-modale-content__title">Inscription</h2>
                <Formik
                    onSubmit={this.submit}
                    initialValues={{ username: "", email: "", password: "" }}
                    validationSchema={this.userSchema}
                    validateOnBlur={true}
                    validateOnChange={false}
                >
                    {({ handleSubmit, isSubmitting, values, errors }) => (
                        <form className="login-form" onSubmit={handleSubmit}>
                            <Field name="username" component={customInput} type="text" placeholder="Pseudo" />
                            <ErrorMessage name="username" component={customError} />
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
                    <span className="login-modale-content__link" onClick={this.props.handleModal}>
                        Connectez vous!
                    </span>
                </p>
            </div>
        );
    }
}
