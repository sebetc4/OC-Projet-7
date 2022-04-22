import { NavLink } from 'react-router-dom';


import React from 'react'

export default function Comments({post}) {
    return (
        <div className='feed-comment'>
            <img className='feed-comment__avatar' src={post.User.avatarUrl} alt='avatar user'></img>
            <div className='feed-comment-content' >
                <div className='feed-comment-content__author-name'>
                    <NavLink to={`/profile/${post.UserId}`}>
                        {`${post.User.firstName} ${post.User.lastName}`}
                    </NavLink>
                </div>
                <p className='feed-comment-content__text'>Voici le premier commentaire du post</p>
            </div>
        </div>
    )
}
