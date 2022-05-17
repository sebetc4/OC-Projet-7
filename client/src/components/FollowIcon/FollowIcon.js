import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";


import { Chip } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { addUserFollowed, deleteUserFollowed } from '../../store/actions/usersFollowed.actions';

export default function FollowIcon({ user }) {

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

    const handleFollow = () => {
        if (userIsFollowed) {
            dispatch(deleteUserFollowed(user.id, indexInUsersFollowed))
        }
        else {
            const { id, firstName, lastName, avatarUrl } = user
            dispatch(addUserFollowed(user.id, { id, firstName, lastName, avatarUrl }))
        }
    }

    return (
        <Chip
            icon={userIsFollowed ? <PersonRemoveAlt1Icon /> : <PersonAddAlt1Icon />}
            label={userIsFollowed ? 'Se désabonner' : 'S\'abonner'}
            variant="outlined"
            onClick={handleFollow}
        />
    )
}
