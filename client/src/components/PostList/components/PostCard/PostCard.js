import React, { useEffect, useState, forwardRef } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Dialog, Slide, useMediaQuery } from '@mui/material';

import { likePost } from '../../../../store/actions/posts.actions';
import { Comments, PostForm } from '../index'
import { PostCardActions, PostCardContent, PostCardTop } from './components';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostCard({ type, post, postIndex, author }) {

    // Hooks
    const dispatch = useDispatch()
    const fullScreen = useMediaQuery('(max-width:768px)');

    // State
    const [userIndexInUsersLiked, setUserIndexInUsersLiked] = useState(-1)
    const [userLiked, setUserLiked] = useState(false)
    const [showNewComment, setShowNewComment] = useState(false)
    const [showModifyPost, setShowModifyPost] = useState(false)


    // Store
    const user = useSelector((state) => state.user.data)

    // Check if user liked post
    useEffect(() => {
        setUserLiked(post.usersLiked.includes(user.id))
        post.usersLiked.includes(user.id) && setUserIndexInUsersLiked(post.usersLiked.indexOf(user.id))
    }, [post, user])

    const toggleLike = () => {
        const likeStatut = userLiked ? 0 : 1
        dispatch(likePost(post, postIndex, user.id, userIndexInUsersLiked, likeStatut))
        setUserLiked(!userLiked)
    }


    const toggleShowNewComment = () => setShowNewComment(!showNewComment)
    const toggleShowModifyPost = () => setShowModifyPost(!showModifyPost)

    return (
        <>
            <article className='post-card'>
                <PostCardTop
                    type={type}
                    author={author}
                    post={post}
                    postIndex={postIndex}
                    user={user}
                    toggleShowModifyPost={toggleShowModifyPost}
                />
                <PostCardContent
                    type={type}
                    post={post}
                />

                <PostCardActions
                    type={type}
                    post={post}
                    toggleLike={toggleLike}
                    userLiked={userLiked}
                    toggleShowNewComment={toggleShowNewComment}
                    showNewComment={showNewComment}
                />
                <Comments
                    type={type}
                    post={post}
                    postIndex={postIndex}
                    user={user}
                    showNewComment={showNewComment}
                    toggleShowNewComment={toggleShowNewComment}
                />
            </article>

            <Dialog
                onClose={toggleShowModifyPost}
                open={showModifyPost}
                maxWidth={'xl'}
                fullScreen={fullScreen}
                keepMounted
                TransitionComponent={Transition}
                scroll={'body'}
            >
                <PostForm
                    type={'modify'}
                    post={post}
                    closeModal={toggleShowModifyPost}
                    postIndex={postIndex}
                    initialValueText={post.text}
                    initialValueImage={post.imageUrl}
                    initialValueVideoUrl={post.videoUrl}
                />
            </Dialog>

        </>

    )
}
