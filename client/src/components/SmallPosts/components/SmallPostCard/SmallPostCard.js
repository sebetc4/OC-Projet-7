import React from 'react'

import { SmallPostContent, SmallPostHeader } from './components';

export default function PostCard({ post, user }) {

    return (
        <>
            <article className='small-post-card'>
                <SmallPostHeader
                    post={post}
                    user={user}
                />
                <SmallPostContent post={post} />
            </article>
        </>
    )
}
