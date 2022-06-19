import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { PostFormActions, PostFormTop, PostFormMedia, PostFormVideoInput } from './components';
import { createPost, updatePost } from '../../../../store/actions/posts.actions';
import { CircularProgress } from '@mui/material';


export default function PostForm({ type, post, postIndex, initialValueText, initialValueImage, closeModal, initialValueVideoUrl }) {


    // Hooks
    const dispatch = useDispatch()
    const textareaRef = useRef()

    // Store
    const user = useSelector((state) => state.user.data)
    const postSubmitting = useSelector((state) => state.posts.submitting)
    const deviceSize = useSelector(state => state.app.deviceSize)
    const colorMode = useSelector(state => state.app.colorMode)

    // State
    const [text, setText] = useState(initialValueText)
    const [textLength, setTextLength] = useState(0)
    const [updateImage, setUpdateImage] = useState(false)
    const [image, setImage] = useState(initialValueImage ? initialValueImage : null)
    const [file, setFile] = useState(null)
    const [video, setVideo] = useState('')
    const [deleteVideo, setDeleteVideo] = useState(false)
    const [videoUrl, setVideoUrl] = useState(initialValueVideoUrl)
    const [showVideoInput, setShowVideoInput] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [submitting, setSubmitting] = useState(false)

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

    // Post submitted
    useEffect(() => {
        if (submitting && !postSubmitting) {
            setSubmitting(false)
            if (type !== 'modify') {
                setText('')
                setImage(null)
                setFile(null)
                setVideo('')
                setVideoUrl('')
            }
            setUpdateImage(false)
            closeModal()
        }
    }, [type, submitting, postSubmitting, closeModal])

    const handleDeleteImage = () => {
        (type === 'modify') && setUpdateImage(true)
        setImage(null)
        setFile(null)
    }

    const handleDeleteVideo = () => {
        setVideo('')
        setVideoUrl('')
        type === 'modify' && setDeleteVideo(true)
    }

    const toggleShowVideoInput = () => setShowVideoInput(prev => !prev)

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('text', text)
        type === 'modify' && formData.append('updateImage', updateImage)
        type === 'modify' && formData.append('deleteVideo', deleteVideo)
        videoUrl && formData.append('video', videoUrl)
        file && formData.append('post', file)
        if (type === 'modify')
            dispatch(updatePost(formData, post.id, postIndex))
        else
            dispatch(createPost(formData, user))
        setSubmitting(true)
    }

    return (
        <form
            className={`post-form ${colorMode === 'dark' ? 'post-form--dark' : ''}`}
            onSubmit={submit}
        >
            <PostFormTop
                type={type}
                closeModal={closeModal}
                submitting={submitting}
            />
            <div className='post-form-textarea'>
                <label className='post-form-textarea__label' htmlFor={type !== 'modify' ? 'post-form-textarea-new-post' : `post-form-textarea-${post.id}`}>Texte</label>
                <TextareaAutosize
                    id={type !== 'modify' ? 'post-form-textarea-new-post' : `post-form-textarea-${post.id}`}
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
                submitting={submitting}
            />
            <Collapse
                timeout={500}
                orientation="vertical"
                in={showVideoInput}
            >
                <PostFormVideoInput
                    type={type}
                    post={post}
                    video={video}
                    setVideo={setVideo}
                    setVideoUrl={setVideoUrl}
                    toggleShowVideoInput={toggleShowVideoInput}
                    setDeleteVideo={setDeleteVideo}
                />
            </Collapse>
            <div className='post-form-bottom'>
                {!submitting ?
                    <Button
                        color='secondary'
                        disabled={submitDisabled}
                        type='submit'
                        variant="contained">
                        {type === 'modify' ? 'Modifier' : 'Poster'}
                    </Button> :
                    <CircularProgress color='secondary'/>
                }

            </div>
        </form>
    )
}
