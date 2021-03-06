import React from 'react'
import { Formik } from 'formik'
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { IconButton } from '@mui/material';

import { SearchThinSvg } from '../../../../components';

export default function SearchBar() {

    // Hooks
    const navigate = useNavigate()

    const settingsSchema = Yup.object().shape({
        query: Yup
            .string()
            .min(1)
            .required(),
    });

    const submit = (values, actions) => {
        const query = values.query.replaceAll(' ', '+')
        navigate(`/search/${query}`, { replace: true })
        values.query = ''
        actions.setSubmitting(false);
    }

    return (
        <div className='search-bar-container'>
            <Formik
                onSubmit={submit}
                initialValues={{ query: '' }}
                validationSchema={settingsSchema}
                validateOnBlur={true}
                validateOnChange={true}
            >
                {({ handleSubmit, handleChange, handleBlur, isSubmitting, isValid, values }) => (
                    <form 
                    className='search-bar' 
                    onSubmit={handleSubmit}
                    >
                        <input
                            name='query'
                            value={values.query}
                            className='search-bar__input'
                            placeholder='Rechercher sur Groupomania...'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='search-bar__bottom-bar' />
                        <IconButton
                            aria-label='Rechercher'
                            className='search-bar__button'
                            type='submit'
                            color="secondary"
                            disabled={isSubmitting || !isValid || values.query === '' }
                        >
                            <SearchThinSvg />
                        </IconButton>
                    </form>
                )}
            </Formik>
        </div>
    )
}
