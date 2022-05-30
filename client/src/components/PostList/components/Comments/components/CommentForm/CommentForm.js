import React, { useState, useEffect } from 'react'
import { createComment, updateComment } from '../../../../../../store/actions/posts.actions';
import { useDispatch } from "react-redux";

import { TextareaAutosize } from '@mui/base';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function CommentForm({ type, initialValueText, postId, postIndex, commentId, commentIndex, user, textareaRef, toggleShowCommentForm }) {

    const dispatch = useDispatch()

    const [text, setText] = useState(initialValueText)
    const [textLength, setTextLength] = useState(0)

    // Set text Length
    useEffect(() => {
        setTextLength(text.length)
    }, [text])

    const submit = (e) => {
        e.preventDefault()
        if (type === 'modify') {
            dispatch(updateComment(commentId, commentIndex, postIndex, text))
        }
        else {
            dispatch(createComment(postId, postIndex, user, text))
            setText('')
        }
        toggleShowCommentForm()
    }

    return (
        <form
            className='comment-form'
            onSubmit={submit}
        >
            <div className='comment-form__author-name'>
                <p>{`${user.firstName} ${user.lastName}`}</p>
            </div>

            <div className='comment-form-textarea'>
                <label className='comment-form-textarea__label' htmlFor='comment-form-textarea'>Texte</label>
                <TextareaAutosize
                    ref={textareaRef}
                    id='comment-form-textarea'
                    maxLength={300}
                    maxRows={4}
                    className='comment-form-textarea__input'
                    name='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                    placeholder='Votre commentaire...'
                />
                <p className={`comment-form-textarea__counter${textLength >= 300 ? ' comments-form-textarea-counter--error' : ''}`}>
                    {textLength}/300 caractères
                </p>
            </div>
            <div className='comment-form__button-container'>
                <Button
                    onClick={submit}
                    size="small"
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={text === '' || text === initialValueText}
                >
                    {type === 'modify' ? 'Modifier' : 'Commenter'}
                </Button>
            </div>

        </form>
    )
}
