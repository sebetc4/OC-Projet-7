import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createPost, modifyPost } from '../../../../store/actions/posts.actions';
import { AddPictureSvg, TextareaAutoResize } from '../../../../components'

export default function FormPost({ post, posts, postIndex, type, initialValueText, initialValueImage, toggleDisplayModifyPost }) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [updateImage, setUpdateImage] = useState(false)
    const [image, setImage] = useState(initialValueImage ? initialValueImage : null)
    const [file, setFile] = useState(null)
    const [text, setText] = useState(initialValueText)

    // Store
    const user = useSelector((state) => state.user.data)

    useEffect(() => {
        if (file) {
            setImage(URL.createObjectURL(file))
            setUpdateImage(true)
        }  
    }, [file])

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post', file)
        formData.append('text', text)
        formData.append('userId', user.id)
        updateImage && formData.append('updateImage', true)
        if (type === 'modify') {
            dispatch(modifyPost(formData, post.id, postIndex))
            toggleDisplayModifyPost()
        } else {
            dispatch(createPost(formData, user))
            setFile(null)
            setImage(null)
            setText('')
        }
    }

    return (
                <form className='post-form' onSubmit={submit}>
                    <label className='post-form__input-text'>
                        <TextareaAutoResize
                            placeholder={'Votre publication...'}
                            text={text}
                            setText={setText}
                        />
                    </label>
                    {image && (
                        <><div className='post-form-image'>
                            <img
                                alt='post'
                                src={image}
                            />
                            <button
                                className='post-form-image__delete-button'
                                onClick={() => {
                                    setImage(null)
                                    setFile(null)
                                }}>
                                Supprimer
                            </button>
                        </div >
                        </>
                    )}
                    <label className='post-form__input-image' >
                        <input
                            accept="image/*"
                            id='feed-image'
                            name='feed-image'
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <AddPictureSvg />
                    </label>
                    <button
                        className='post-form__submit-button'
                        type='submit'
                    >
                        {type === 'modify' ? 'Modifier' : 'Poster'}
                    </button>
                </form>
    )
}
