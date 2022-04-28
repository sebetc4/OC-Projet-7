import React from 'react'
import { useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUser, deleteUser } from '../../../../store/actions/user.actions';
import axios from 'axios';


export default function SettingForm({action, validationSchemas, inputs, initialValues}) {

    const dispatch = useDispatch();

    const customInput = ({ field, form, ...props }) => {
        return (
            <>
                <label className='settings-item-form__label' htmlFor={field.name}>{`${props.placeholder}:`}</label>
                <input
                    {...field}
                    {...props}
                    className={`settings-item-form__input ${form.errors[field.name] && form.touched[field.name]
                        ? 'error'
                        : ''}`
                    }
                />
            </>
        );
    };

    const customError = (props) => {
        return <p className='settings-item-form__error'> {props.children} </p>;
    };

    const settingsSchema = Yup.object().shape(validationSchemas);

    const submit = (values, actions) => {
        switch (action) {
            case 'updateUser':
                dispatch(updateUser( { ...values } ))
                break;
            case 'updatePassword':
                axios.put(`/api/user/password`, { ...values })
                break;
            case 'deleteAccount':
                dispatch(deleteUser(values))
                break;
            default:
                break;
        }
        actions.setSubmitting(false);
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={settingsSchema}
            validateOnBlur={true}
            validateOnChange={false}
        >
            {({ handleSubmit, isSubmitting }) => (
                <form className='settings-item-form' onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <div key={input.name} className="settings-item-form__label-input-container">
                            <Field name={input.name} component={customInput} type={input.type} placeholder={input.placeholder} />
                            <ErrorMessage name={input.name} component={customError} />
                        </div>
                    ))}
                    <button type="submit" className="settings-item-form__button" disabled={isSubmitting}>
                        {`${action === 'deleteAccount' ? 'Supprimer' : 'Modifier'}`}
                    </button>
                </form>
            )}
        </Formik>)
}
