import React from 'react'
import { PostForm } from '../index'


export default function NewPost() {
    return (
        <div className='new-post'>
            <h2 className='new-post__title'>Créer une publication</h2>
            <PostForm 
                initialValueText={''}
                submitButton={'Publier'}
            />
        </div>
    )
}
