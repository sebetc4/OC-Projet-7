import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FromNowDate } from '../../../../components';
import { useDispatch, useSelector } from "react-redux";
import { likePost } from '../../../../store/actions/posts.actions';
import { NewComment, Comment, PostMenu, PostContent } from './components';
import FormPost from '../forms/FormPost';

import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';


export default function Post({ post, posts, postIndex }) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [userIndex, setUserIndex] = useState(-1)
    const [userLiked, setUserLiked] = useState(false)
    const [userIsAuthor, setUserIsAuthor] = useState(false)
    const [displayNewComment, setDisplayNewComment] = useState(false)
    const [displayPostMenu, setDisplayPostMenu] = useState(false)
    const [displayModifyPost, setDisplayModifyPost] = useState(false)


    // Store
    const user = useSelector((state) => state.user.data)

    // Check if user is author's post
    useEffect(() => {
        setUserLiked(post.usersLiked.includes(user.id))
        userLiked && setUserIndex(post.usersLiked.indexOf(user.id))
        post.UserId === user.id && setUserIsAuthor(true)
    }, [])

    const toggleLike = () => {
        const likeStatut = userLiked ? 0 : 1
        dispatch(likePost(post, postIndex, user.id, userIndex, likeStatut))
        setUserLiked(!userLiked)
    }


    const toggleDisplayNewComment = () => setDisplayNewComment(!displayNewComment)
    const toggleDisplayPostMenu = () => setDisplayPostMenu(!displayPostMenu)
    const toggleDisplayModifyPost = () => setDisplayModifyPost(!displayModifyPost)

    return (
        <article className='post'>
            <div className='post-header'>
                <img
                    className='post-header__avatar'
                    src={post.User.avatarUrl}
                    alt='avatar user'
                />
                <div className='post-header__infos'>
                    <NavLink to={`/profile/${post.UserId}`}>
                        {`${post.User.firstName} ${post.User.lastName}`}
                    </NavLink>
                    <FromNowDate date={post.createdAt} className='test'
                    />
                </div>
                {displayModifyPost}
                {userIsAuthor &&
                    <div className='post-header__comment-menu-button-container'
                    >
                        <button
                            onClick={toggleDisplayPostMenu}
                        >
                            <FontAwesomeIcon
                                icon={faEllipsis}
                            />
                        </button>
                    </div>}
                {displayPostMenu &&
                    <PostMenu
                        closeModal={toggleDisplayPostMenu}
                        toggleDisplayModifyPost={toggleDisplayModifyPost}
                        postId={post.id}
                        posts={posts}
                        postIndex={postIndex}
                    />}
            </div>
            {displayModifyPost ?
                <FormPost
                    post={post}
                    postIndex={postIndex}
                    posts={posts}
                    type={'modify'}
                    initialValueText={post.text}
                    initialValueImage={post.imageUrl}
                    toggleDisplayModifyPost={toggleDisplayModifyPost}
                /> :
                <PostContent post={post} />}
            <div className='post-actions'>
                <button
                    variant="outlined"
                    onClick={toggleLike}
                >
                    <ThumbUpIcon />
                    {userLiked ? 'J\'aime pas' : 'J\'aime'}
                </button>
                <button
                    variant="outlined"
                    onClick={toggleDisplayNewComment}
                >
                    <CommentIcon />
                    Commenter
                </button>
            </div>
            {displayNewComment &&
                <NewComment
                    postId={post.id}
                    posts={posts}
                    postIndex={postIndex}
                    user={user} />}
            {post.CommentPosts.length !== 0 && post.CommentPosts.map((comment, index) =>
                <Comment
                    key={comment.id}
                    posts={posts}
                    postIndex={postIndex}
                    comment={comment}
                    commentId={comment.id}
                    commentIndex={index}
                />)}
        </article>
    )
}
