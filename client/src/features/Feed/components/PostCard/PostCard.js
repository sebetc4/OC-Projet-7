import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { likePost } from '../../../../store/actions/posts.actions';
import { PostContent, PostActions, PostHeader, Comments } from './components';
import { PostForm } from '../index';
import { StandartModal } from '../../../../components';

export default function PostCard({ post, postIndex }) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [userIndex, setUserIndex] = useState(-1)
    const [userLiked, setUserLiked] = useState(false)
    const [displayNewComment, setDisplayNewComment] = useState(false)
    const [displayModifyPost, setDisplayModifyPost] = useState(false)


    // Store
    const user = useSelector((state) => state.user.data)

    // Check if user is author's post
    useEffect(() => {
        setUserLiked(post.usersLiked.includes(user.id))
        userLiked && setUserIndex(post.usersLiked.indexOf(user.id))
    }, [])

    const toggleLike = () => {
        const likeStatut = userLiked ? 0 : 1
        dispatch(likePost(post, postIndex, user.id, userIndex, likeStatut))
        setUserLiked(!userLiked)
    }


    const toggleDisplayNewComment = () => setDisplayNewComment(!displayNewComment)
    const toggleDisplayModifyPost = () => setDisplayModifyPost(!displayModifyPost)

    return (
        <>
            <article className='post-card'>
                <PostHeader
                    post={post}
                    postIndex={postIndex}
                    user={user}
                    toggleDisplayModifyPost={toggleDisplayModifyPost}
                />
                <PostContent post={post} />

                <PostActions
                    post={post}
                    toggleLike={toggleLike}
                    userLiked={userLiked}
                    toggleDisplayNewComment={toggleDisplayNewComment}
                    displayNewComment={displayNewComment}
                />
                <Comments
                    post={post}
                    postIndex={postIndex}
                    user={user}
                    displayNewComment={displayNewComment}
                    toggleDisplayNewComment={toggleDisplayNewComment}
                />
            </article>

            {displayModifyPost &&
                <StandartModal
                    closeModal={toggleDisplayModifyPost}
                    closeClickOut={false}
                >
                    <PostForm
                        type={'modify'}
                        post={post}
                        closeModal={toggleDisplayModifyPost}
                        postIndex={postIndex}
                        initialValueText={post.text}
                        initialValueImage={post.imageUrl}
                    />
                </StandartModal>

            }
        </>

    )
}
