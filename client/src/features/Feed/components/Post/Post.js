import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FromNowDate } from '../../../../components';
import { useDispatch, useSelector } from "react-redux";
import { likePost, deletePost } from '../../../../store/actions/posts.actions';
import NewComment from './components/NewComment';


export default function Post({ post, posts, postIndex }) {

    // Hooks
    const dispatch = useDispatch()

    // State
    const [userIndex, setUserIndex] = useState(-1)
    const [userLiked, setUserLiked] = useState(false)
    const [userIsAuthor, setUserIsAuthor] = useState(false)

    // Store
    const user = useSelector((state) => state.user.data)


    useEffect(() => {
        setUserLiked(post.usersLiked.includes(user.id))
        userLiked && setUserIndex(post.usersLiked.indexOf(user.id))
        post.UserId === user.id && setUserIsAuthor(true)
    }, [])

    const toggleLike = () => {
        const likeStatut = userLiked ? 0 : 1
        dispatch(likePost(posts, post, postIndex, userIndex, user.id, likeStatut))
        setUserLiked(!userLiked)
    }

    const handleDeletePost = () => dispatch(deletePost(post.id, posts, postIndex))

    return (
        <article className='feed-article'>
            <div className='feed-article-header'>
                <img className='feed-article-header__avatar' src={post.User.avatarUrl} alt='avatar user'></img>
                <div className='feed-article-header__infos'>
                    <NavLink to={`/profile/${post.UserId}`}>
                        {`${post.User.firstName} ${post.User.lastName}`}
                    </NavLink>
                    <FromNowDate date={post.createdAt} className='test'
                    />
                </div>
                <FontAwesomeIcon icon={faEllipsis} />
                {userIsAuthor && <button onClick={handleDeletePost}>Supprimer</button>}
            </div>
            {post.text &&
                <div className='feed-article-text'>
                    <p>{post.text}</p>
                </div>
            }
            {post.imageUrl &&
                <div className='feed-article-image'>
                    <img src={post.imageUrl} alt='feed' />
                </div>
            }
            <p>{`${post.likes} J'aimes`}</p>
            <div className='feed-article-actions'>
                <button onClick={toggleLike}>{userLiked ? 'J\'aime pas' : 'J\'aime'}</button>
                <button>Commenter</button>
            </div>
            <NewComment user={user} />
        </article>
    )
}
