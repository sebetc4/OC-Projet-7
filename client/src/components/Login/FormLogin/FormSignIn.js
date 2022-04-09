import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import { customInput, customError } from "./models";

export default function FormSignIn(props) {

    const userSchema = Yup.object().shape({
        email: Yup.string().email("Mail non valide").required("Champ requis"),
        password: Yup.string().min(6, "Trop court").required("Champ requis"),
    });

    const submit = async (values, actions) => {
        await axios
            .post(`api/auth/login`, values)
            .then((res) => {
                props.handleLogin(res.data.userId)
            })
            .catch((err) => {
                if (err.response) {
                    actions.setFieldError(err.response.data.path, err.response.data.error);
                }
            });
    };

    return (
            <div className="login-modale-content">
                <h2 className="login-modale-content__title">Connexion</h2>
                <Formik
                    onSubmit={submit}
                    initialValues={{ email: "", password: "" }}
                    validationSchema={userSchema}
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
                    <span className="login-modale-content__link" onClick={props.handleModal}>
                        Rejoignez nous!
                    </span>
                </p>
            </div>
    );
}
