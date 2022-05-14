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
            {!post.imageUrl && post.videoUrl &&
                <div className='post-card-content__video-container'>
                    <iframe
                        width="560"
                        height="315"
                        src={post.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            }
        </>
    )
}
