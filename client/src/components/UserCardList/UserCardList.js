import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import { UserCard } from './components';

export default function UserCardList({ users }) {

    // State
    const [allUsers, setAllUsers] = useState([])

    // Store
    const user = useSelector(state => state.user.data)

    useEffect(() => {
        setAllUsers(users)
    }, [users])

    const handleFollow = (cardIndex) => {
        const { id, firstName, lastName, avatarUrl } = user
        const newAllUsers = [...allUsers]
        newAllUsers[cardIndex].followers.push({ id, firstName, lastName, avatarUrl })
        setAllUsers(newAllUsers)
    }

    const handleUnfollow = (cardIndex) => {
        let newAllUsers = [...allUsers]
        newAllUsers[cardIndex].followers = allUsers[cardIndex].followers.filter(u => u.id !== user.id)
        setAllUsers(newAllUsers)
    }

    return (
        <>
            {
                allUsers.map((userInCard, index) => (
                    <Box
                        component="article"
                        sx={{
                            backgroundColor: 'background.article',
                        }}
                        className='user-card'
                        key={userInCard.id}
                    >
                        <UserCard
                            userInCard={userInCard}
                            cardIndex={index}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                        />
                    </Box>
                ))
            }
        </>
    )
}
