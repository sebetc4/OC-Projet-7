import React, { useState } from 'react'
import { createComment, updateComment } from '../../../../../../store/actions/posts.actions';
import { useDispatch } from "react-redux";

import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function CommentForm({ type, initialValueText, postId, postIndex, commentId, commentIndex, user, textareaRef, toggleShowForm }) {

    const dispatch = useDispatch()

    const [text, setText] = useState(initialValueText)

    const submit = (e) => {
        e.preventDefault()
        if (type === 'modify') {
            dispatch(updateComment(commentId, commentIndex, postIndex, text))
        }
        else {
            dispatch(createComment(postId, postIndex, user, text))
            setText('')
        }
        toggleShowForm()
    }

    return (
        <div className='post-comment-form'>
            <div className='post-comment-form-author-name'>
                <p>{`${user.firstName} ${user.lastName}`}</p>
            </div>
            <form
                className='post-comment-form-formulary'
                onSubmit={(e) => submit(e)}
            >
                <label>
                    <TextareaAutosize
                        ref={textareaRef}
                        maxRows={4}
                        className='post-comment-form__textarea'
                        name='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                        placeholder='Votre commentaire...'
                    />
                </label>
                <div className='post-comment-form-formulary__submit'>
                    <Button
                        type='submit'
                        size="small"
                        variant="contained"
                        endIcon={<SendIcon />}>
                        {type === 'modify' ? 'Modifier' : 'Commenter'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
