import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { PostFormActions, PostFormTop, PostFormMedia, PostFormVideoInput } from './components';
import { createPost, updatePost } from '../../../../store/actions/posts.actions';


export default function PostForm({ type, post, postIndex, initialValueText, initialValueImage, closeModal, initialValueVideoUrl }) {


    // Hooks
    const dispatch = useDispatch()
    const textareaRef = useRef()

    // Store
    const user = useSelector((state) => state.user.data)
    const deviceSize = useSelector(state => state.app.deviceSize)

    // State
    const [text, setText] = useState(initialValueText)
    const [textLength, setTextLength] = useState(0)
    const [updateImage, setUpdateImage] = useState(false)
    const [image, setImage] = useState(initialValueImage ? initialValueImage : null)
    const [file, setFile] = useState(null)
    const [video, setVideo] = useState('')
    const [videoUrl, setVideoUrl] = useState(initialValueVideoUrl)
    const [showVideoInput, setShowVideoInput] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)

    // Change file
    useEffect(() => {
        if (file) {
            setImage(URL.createObjectURL(file))
            setUpdateImage(true)
        }
    }, [file])

    // Set text Length
    useEffect(() => {
        setTextLength(text.length)
    }, [text])

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

    const handleDeleteVideo = () => {
        setVideo('')
        setVideoUrl('')
    }

    const toggleShowVideoInput = () => setShowVideoInput(!showVideoInput)

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('text', text)
        file && formData.append('post', file)
        videoUrl && formData.append('video', videoUrl)
        updateImage && formData.append('updateImage', true)
        if (type === 'modify') {
            dispatch(updatePost(formData, post.id, postIndex))
        } else {
            dispatch(createPost(formData, user))
            handleDeleteVideo()
            handleDeleteImage()
            setText('')
        }
        closeModal()
    }

    return (
        <form
            className='post-form'
            onSubmit={submit}
        >
            <PostFormTop
                type={type}
                closeModal={closeModal}
            />
            <div className='post-form-textarea'>
                <label className='post-form-textarea__label' htmlFor='post-form-textarea'>Texte</label>
                <TextareaAutosize
                    id='post-form-textarea'
                    ref={textareaRef}
                    maxLength={500}
                    minRows={deviceSize !== 0 ? 1 : 3}
                    maxRows={4}
                    className='post-form-textarea__input'
                    name='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                    placeholder='Votre publication...'
                />
                <p className={`settings-form-textarea__counter${textLength >= 500 ? ' settings-form-textarea-counter--error' : ''}`}>
                    {textLength}/500 caractères
                </p>
            </div >
            <PostFormMedia
                image={image}
                videoUrl={videoUrl}
            />
            <PostFormActions
                image={image}
                video={video}
                videoUrl={videoUrl}
                setFile={setFile}
                handleDeleteImage={handleDeleteImage}
                toggleShowVideoInput={toggleShowVideoInput}
                handleDeleteVideo={handleDeleteVideo}
                showVideoInput={showVideoInput}
            />
            <Collapse
                timeout={500}
                orientation="vertical"
                in={showVideoInput}
            >
                <PostFormVideoInput
                    video={video}
                    setVideo={setVideo}
                    setVideoUrl={setVideoUrl}
                    toggleShowVideoInput={toggleShowVideoInput}
                />
            </Collapse>
            <div className='post-form-bottom'>
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
