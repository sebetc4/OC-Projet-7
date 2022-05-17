import React from 'react'

import { SmallPostCard } from './components'

export default function SmallPostList({ type, posts, user }) {
  return (
    <>
      {
        posts && posts.map((post, index) => (
          <SmallPostCard
            key={post.id}
            post={post}
            user={type === 'search' ? post.User : user} />
      ))
      }
    </>
  )
}
