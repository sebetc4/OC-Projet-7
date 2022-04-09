import React from 'react'
import { Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {

    const submit = (values, actions) => { }

    return (
        <div className='search-bar-container'>
            <Formik onSubmit={submit} initialValues={{ query: '', language: 'en-US' }}>
                {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                    <form className='search-bar' onSubmit={handleSubmit}>
                        <input
                            name='query'
                            className='search-bar__input'
                            placeholder='Rechercher sur Groupomania...'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <button className='search-bar__button' type='submit' disabled={isSubmitting}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                )}
            </Formik>
        </div>


    )
}
