import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { PostFormActions, PostFormHeader, PostFormMedia, PostFormVideoInput } from './components';
import { createPost, updatePost } from '../../../../store/actions/posts.actions';


export default function PostForm({ type, post, postIndex, initialValueText, initialValueImage, closeModal }) {

    // Hooks
    const dispatch = useDispatch()
    const textareaRef = useRef()


    // State
    const [text, setText] = useState(initialValueText)
    const [updateImage, setUpdateImage] = useState(false)
    const [image, setImage] = useState(initialValueImage ? initialValueImage : null)
    const [file, setFile] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [video, setVideo] = useState(null)
    const [displayVideoInput, setDisplayVideoInput] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)

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
        if (text || image || videoUrl) {
            setSubmitDisabled(false)
        }
        else
            setSubmitDisabled(true)
    }, [text, image, videoUrl])

    // Set focus on textarea
    useEffect(() => {
        textareaRef && textareaRef.current.focus()
    }, [textareaRef])

    const handleDeleteImage = () => {
        (type === 'modify') && setUpdateImage(true)
        setImage(null)
        setFile(null)
    }

    const handleVideoUrl = () => setVideoUrl(video)

    const toggleDisplayVideoInput = () => setDisplayVideoInput(!displayVideoInput)

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post', file)
        formData.append('text', text)
        formData.append('video', videoUrl)
        updateImage && formData.append('updateImage', true)
        if (type === 'modify') {
            dispatch(updatePost(formData, post.id, postIndex))
        } else {
            dispatch(createPost(formData, user))
        }
        closeModal()
    }

    return (
        <form className='post-form' onSubmit={submit}>
            <PostFormHeader
                type={type}
                closeModal={closeModal}
            />
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
            <PostFormMedia
                image={image}
                video={video}
            />
            <PostFormActions
                image={image}
                setFile={setFile}
                handleDeleteImage={handleDeleteImage}
                toggleDisplayVideoInput={toggleDisplayVideoInput}
            />
            <PostFormVideoInput 
                setVideo={setVideo}
                handleVideoUrl={handleVideoUrl}
            />
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
