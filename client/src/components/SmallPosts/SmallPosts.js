import React from 'react'

import { PostCard } from './components'

export default function SmallPostList({ profileData }) {
  return (
    <>
      {
        profileData.Posts && profileData.Posts.map((post, index) => (
          <PostCard key={post.id} post={post} profileData={profileData} />
        ))
      }
    </>
  )
}
