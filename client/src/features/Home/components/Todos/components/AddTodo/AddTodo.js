import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddTodo({ dispatchCreateTodo }) {

    const todoSchema = Yup.object().shape({
        todo: Yup.string().min(1, 'Trop court').max(50, 'Trop long').required("Champ requis"),
    });

    const submit = (values, actions) => {
        dispatchCreateTodo(values.todo)
        values.todo = ''
        actions.setSubmitting(false);
    }

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                todo: '',
            }}
            validationSchema={todoSchema}
            validateOnBlur={true}
            validateOnChange={true}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, values }) => (
                <Form
                    className='todos-add'
                    onSubmit={handleSubmit}
                >
                    <Field
                        className='todos-add__input'
                        error={!!errors.todo}
                        as={TextField}
                        variant='outlined'
                        name={'todo'}
                        type={'text'}
                        size="small"
                        label={'Nouvelle tâche'}
                        helperText={<ErrorMessage name={'todo'} />}
                    />
                    <div className='todos-add__button'>
                        <IconButton
                            onClick={handleSubmit}
                            component="span"
                            size='large'
                            color='primary'
                            disabled={ !(!isSubmitting && isValid && values.todo !== '') }
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
