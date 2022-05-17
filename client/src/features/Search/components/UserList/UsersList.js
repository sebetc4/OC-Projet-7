import React from 'react'
import { UserCard } from './components'

export default function UsersList({ users }) {

  console.log(users)

  return (
    <>
      {
        users && users.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))
      }
    </>
  )
}
