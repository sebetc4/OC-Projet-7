import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';



export default function AddTodo({dispatchCreateTodo}) {

    const todoSchema = Yup.object().shape({
        todo: Yup.string().required("Champ requis"),
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
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form onSubmit={handleSubmit}>
                    <Field
                        error={errors.firstName}
                        as={TextField}
                        variant='outlined'
                        name={'todo'}
                        type={'text'}
                        size="small"
                        label={'Todo'}
                        helperText={<ErrorMessage name={'todo'} />}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}>
                        Ajouter
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
