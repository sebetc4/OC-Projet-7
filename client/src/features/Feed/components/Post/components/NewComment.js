import React, { useState } from 'react'
import { TextareaAutoResize } from '../../../../../components'

export default function NewComment({ user }) {

    const [text, setText] = useState('')

    return (
        <div className='feed-new-comment'>
            <img className='feed-new-comment__avatar' src={user.avatarUrl} alt='avatar user'></img>
            <div className='feed-new-comment-content' >
                <div className='feed-new-comment-content__author-name'>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                </div>
                <form>
                <label>
                    <TextareaAutoResize 
                        text={text}
                        setText={setText}
                    />
                </label>
                <button
                    className='new-post-form__button'
                    type='submit'
                >
                    Commenter
                </button>
                </form>
            </div>
        </div>
    )
}
