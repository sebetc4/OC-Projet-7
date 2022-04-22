import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../../../../store/actions/posts.actions';
import { AddPictureSvg, TextareaAutoResize } from '../../../../components'

export default function NewPost() {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [image, setImage] = useState(null)
    const [text, setText] = useState('')


    // Store
    const user = useSelector((state) => state.user.data)

    // Resize textarea


    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post', image)
        formData.append('text', text)
        formData.append('userId', user.id)
        dispatch(createPost(formData, user))
        setImage(null)
        setText('')
    }

    return (
        <div className='new-post'>
            <h2 className='new-post__title'>Créer une publication</h2>
            {image && (
                <>
                    <img className='new-post__image' alt='post' src={URL.createObjectURL(image)} />
                    <button onClick={() => setImage(null)}>Supprimer</button>
                </>
            )}

            <form className='new-post-form' onSubmit={ (e) => submit(e) }>
                
                <label>
                    <TextareaAutoResize 
                        text={text}
                        setText={setText}
                    />
                </label>
                <label className='new-post-form__input-image' >
                    <input
                        accept="image/*"
                        id='feed-image'
                        name='feed-image'
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <AddPictureSvg />
                </label>
                <button
                    className='new-post-form__button'
                    type='submit'
                >
                    Publier
                </button>
            </form>
        </div>
    )
}
