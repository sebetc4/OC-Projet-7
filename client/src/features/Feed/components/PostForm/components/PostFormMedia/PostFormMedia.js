import React from 'react'

export default function PostFormMedia({image, video}) {
    return (
        <>
            {image && (
                <div className='post-form-image'>
                    <img
                        alt='post'
                        src={image}
                    />
                </div >
            )}
            {video &&
                <iframe
                    width="560"
                    height="315"
                    src={video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            }
        </>
    )
}
