import React, { useState, useEffect } from 'react'

import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { UserCardList } from '../../../../components';


export default function SearchUsers({ users }) {

  // Params
  const nbUsersDisplay = 5

  // State
  const [userList, setUserList] = useState([])
  const [userListLength, setUserListLength] = useState(nbUsersDisplay)

  useEffect(() => {
    if (users) setUserList(users.slice(0, userListLength))
  }, [users, users.length, userListLength])

  const addUsersInList = () => setUserListLength(userListLength + nbUsersDisplay)


  return (
    <>
      {
        users.length !== 0 ?
          <>
            <UserCardList
              users={userList}
            />
            {userListLength < users.length &&
              <div className='search-users-bottom'>
                <Button
                  color='secondary'
                  size="large"
                  endIcon={<ExpandMoreIcon />}
                  onClick={addUsersInList}
                >
                  Afficher plus de posts
                </Button>
              </div>
            }
          </>
          :
          <p className='search-no-user'>Aucun utilisateur pour votre recherche</p>
      }
    </>
  )
}
