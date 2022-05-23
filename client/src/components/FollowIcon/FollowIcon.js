import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";


import { Fab } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { addUserFollowed, deleteUserFollowed } from '../../store/actions/usersFollowed.actions';

export default function FollowIcon({ user, handleFollow, handleUnfollow }) {

    const [userIsFollowed, setUserIsFollowed] = useState(false)
    const [indexInUsersFollowed, setIndexInUsersFollowed] = useState(null)

    // Hooks
    const dispatch = useDispatch();

    // Store
    const usersFollowed = useSelector(state => state.usersFollowed.data)

    useEffect(() => {
        const chechIfUserIsFollowed = () => {
            for (let i in usersFollowed) {
                if (usersFollowed[i].id === user.id) {
                    setIndexInUsersFollowed(i)
                    return true
                }
            }
            return false
        }

        if (chechIfUserIsFollowed())
            setUserIsFollowed(true)
        else {
            setUserIsFollowed(false)
            setIndexInUsersFollowed(null)
        }
    }, [usersFollowed, user])

    const toggleFollow = () => {
        if (userIsFollowed) {
            dispatch(deleteUserFollowed(user.id, indexInUsersFollowed))
            handleUnfollow()
        }
        else {
            const { id, firstName, lastName, avatarUrl } = user
            dispatch(addUserFollowed(user.id, { id, firstName, lastName, avatarUrl }))
            handleFollow()
        }
    }

    return (
        <Fab
            variant="extended"
            onClick={toggleFollow}
            color='primary'
        >
            {userIsFollowed ? <PersonRemoveAlt1Icon sx={{ mr: 1.5 }} /> : <PersonAddAlt1Icon sx={{ mr: 1.5 }} />}
            {userIsFollowed ? 'Se désabonner' : 'S\'abonner'}
        </Fab>
    )
}
