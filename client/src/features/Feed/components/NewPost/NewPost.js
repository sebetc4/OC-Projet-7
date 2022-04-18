import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../../../../store/actions/posts.actions';
import { AddPictureSvg } from '../../../../components'

export default function NewPost() {

    const [image, setImage] = useState(null)
    const [text, setText] = useState('')

    const textareaRef = useRef()
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.user.data.id)

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [text]);


    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post', image)
        formData.append('text', text)
        formData.append('userId', userId)
        dispatch(createPost(formData))
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
                    <textarea
                        ref={ textareaRef }
                        name='text'
                        className='new-post-form__input-text'
                        placeholder='Votre publication...'
                        onChange={(e) => setText(e.target.value)}
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
                    className=''
                    type='submit'
                >
                    Publier
                </button>
            </form>
        </div>
    )
}
