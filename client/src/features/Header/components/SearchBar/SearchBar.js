import React from 'react'
import { Formik } from 'formik'
import { useNavigate } from "react-router-dom";

import { SearchThinSvg } from '../../../../components';
import axios from 'axios'

export default function SearchBar() {

    const navigate = useNavigate()

    const submit = (values, actions) => {
        const query = Object
            .keys(values)
            .map(k => `${k}=${values[k]}&`)
            .join('');

        navigate(`/search/${query}`, { replace: true })
        // axios.get(`/api/search/${query}`)
    }

    return (
        <div className='search-bar-container'>
            <Formik onSubmit={submit} initialValues={{ query: '' }}>
                {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                    <form className='search-bar' onSubmit={handleSubmit}>
                        <input
                            name='query'
                            className='search-bar__input'
                            placeholder='Rechercher sur Groupomania...'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='search-bar__bottom-bar' />
                        <button className='search-bar__button' type='submit' disabled={isSubmitting}>
                            <SearchThinSvg />
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
