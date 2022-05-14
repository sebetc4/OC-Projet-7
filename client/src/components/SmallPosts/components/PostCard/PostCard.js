import React from 'react'

import { PostContent, PostHeader } from './components';

export default function PostCard({ post, profileData }) {

    return (
        <>
            <article className='post-card'>
                <PostHeader
                    post={post}
                    profileData={profileData}
                />
                <PostContent post={post} />
            </article>
        </>
    )
}
