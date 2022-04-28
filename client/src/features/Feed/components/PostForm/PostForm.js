import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createPost, modifyPost } from '../../../../store/actions/posts.actions';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

export default function PostForm
    ({ type, post, postIndex, initialValueText, initialValueImage, closeModal }) {

    // Hooks
    const dispatch = useDispatch()
    const textareaRef = useRef()


    // State
    const [updateImage, setUpdateImage] = useState(false)
    const [image, setImage] = useState(initialValueImage ? initialValueImage : null)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [file, setFile] = useState(null)
    const [text, setText] = useState(initialValueText)

    // Store
    const user = useSelector((state) => state.user.data)

    // Change file
    useEffect(() => {
        if (file) {
            setImage(URL.createObjectURL(file))
            setUpdateImage(true)
        }
    }, [file])

    // Chech if text and file are empty
    useEffect(() => {
        if (text || image)
            setSubmitDisabled(false)
        else
            setSubmitDisabled(true)
    }, [text, image])

    // Set focus on textarea
    useEffect(() => {
        textareaRef && textareaRef.current.focus()
    }, [textareaRef])

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post', file)
        formData.append('text', text)
        formData.append('userId', user.id)
        updateImage && formData.append('updateImage', true)
        if (type === 'modify') {
            dispatch(modifyPost(formData, post.id, postIndex))
        } else {
            dispatch(createPost(formData, user))
        }
        closeModal()
    }

    return (
        <form className='post-form' onSubmit={submit}>
            <div className='post-form-header'>
                <div> </div>
                <h2>{`${type === 'modify' ? 'Modifier la' : 'Ajouter une'} publication`}</h2>
                <IconButton
                    color="warning"
                    aria-label="Annuler"
                    onClick={closeModal}
                >
                    <CloseIcon color='error' fontSize='medium' />
                </IconButton>
            </div>
            <label>
                <TextareaAutosize
                    ref={textareaRef}
                    maxRows={4}
                    className='post-form-textarea'
                    name='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                    placeholder='Votre publication...'
                />
            </label>
            {image && (
                <div className='post-form-image'>
                    <img
                        alt='post'
                        src={image}
                    />
                </div >
            )}

            <div className='post-form-actions' >
                <Divider />
                <div className='post-form-actions__buttons' >
                    <label>
                        <input
                            title="Type search term here"
                            accept="image/*"
                            id='input-post-image'
                            name='input-post-image'
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Button
                            variant="text"
                            color="primary"
                            component="span"
                            startIcon={<PhotoCamera />}>
                            {`${image ? 'Modifier l\'' : 'Ajouter une '}image`}
                        </Button>
                    </label>
                    {image && (
                        <Button
                            color="warning"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                                setImage(null)
                                setFile(null)
                            }}
                        >
                            Supprimer l'image

                        </Button>
                    )}
                </div>

                <Divider />
            </div>
            <div className='post-form-submit'>
                <Button
                    disabled={submitDisabled}
                    type='submit'
                    variant="contained">
                    {type === 'modify' ? 'Valider' : 'Poster'}
                </Button>
            </div>
        </form>
    )
}
