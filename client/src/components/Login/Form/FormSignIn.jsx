import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";
import { customInput, customError } from "./models";

export default class FormSignIn extends Component {
    userSchema = Yup.object().shape({
        email: Yup.string().email("Mail non valide").required("Champ requis"),
        password: Yup.string().min(6, "Trop court").required("Champ requis"),
    });

    submit = (values, actions) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}api/auth/login`, values)
            .then((res) => {
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
                <h2 className="login-modale-content__title">Connexion</h2>
                <Formik
                    onSubmit={this.submit}
                    initialValues={{ email: "", password: "" }}
                    validationSchema={this.userSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ handleSubmit, isSubmitting, values }) => (
                        <form className="login-form" onSubmit={handleSubmit}>
                            <Field name="email" component={customInput} type="email" placeholder="Email" />
                            <ErrorMessage name="email" component={customError} />
                            <Field name="password" component={customInput} type="password" placeholder="Mot de passe" />
                            <ErrorMessage name="password" component={customError} />
                            <button type="submit" className="login-form__button" disabled={isSubmitting}>
                                Se connecter
                            </button>
                        </form>
                    )}
                </Formik>
                <p className="login-modale-content__text">
                    Pas de compte?
                    <span className="login-modale-content__link" onClick={this.props.handleModal}>
                        Rejoignez nous!
                    </span>
                </p>
            </div>
        );
    }
}
