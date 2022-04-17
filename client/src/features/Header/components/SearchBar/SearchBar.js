import React from 'react'
import { Formik } from 'formik'
import { SearchThinSvg } from '../../../../components';

export default function SearchBar() {

    const submit = (values, actions) => {
        console.log('Recherche')
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
