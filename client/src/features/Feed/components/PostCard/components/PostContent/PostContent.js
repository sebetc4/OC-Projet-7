import React from 'react'

export default function PostContent({ post }) {
    return (
        <>
            {
                post.text &&
                <div className='post-card-content__text-container'>
                    <p>{post.text}</p>
                </div>
            }
            {
                post.imageUrl &&
                <div className='post-card-content__image-container'>
                    <img src={post.imageUrl} alt='feed' />
                </div>
            }
        </>
    )
}
