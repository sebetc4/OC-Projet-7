import React from 'react'

import { PostCard } from './components'

export default function PostList({ type, posts, user }) {
  return (
    <>
      {
        posts && posts.map((post, index) => (
          <PostCard
            key={post.id}
            type={type}
            post={post}
            postIndex={index}
            author={type === 'profile' ? user : post.User} />
        ))
      }
    </>
  )
}
