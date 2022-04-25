import React, { useState } from 'react'
import { createCommentPost } from '../../../../../../store/actions/posts.actions';
import { useDispatch } from "react-redux";
import { TextareaAutoResize } from '../../../../../../components'

export default function NewComment({ postId, posts, postIndex, user }) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [text, setText] = useState('')
    
    const submit = (e) => {
        e.preventDefault()
        dispatch(createCommentPost(postId, postIndex, user, text))
        setText('')
    }

    return (
        <div className='feed-new-comment'>
            <img className='feed-new-comment__avatar' src={user.avatarUrl} alt='avatar user'></img>
            <div className='feed-new-comment-content' >
                <div className='feed-new-comment-content__author-name'>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                </div>
                <form className='' onSubmit={(e) => submit(e)}>
                    <label>
                        <TextareaAutoResize
                            text={text}
                            setText={setText}
                            placeholder={'Votre commentaire...'}
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
