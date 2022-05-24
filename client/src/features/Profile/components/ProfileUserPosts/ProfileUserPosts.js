import React, { useState, useEffect } from 'react'

import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { PostList } from '../../../../components'

export default function ProfileUserPosts({ profileData, posts }) {

    // Params
    const nbPostsDisplay = 3

    // State
    const [userPostList, setUserPostList] = useState([])
    const [userPostListLength, setUserPostListLength] = useState(nbPostsDisplay)

    useEffect(() => {
        if (posts) setUserPostList(posts.slice(0, userPostListLength))
    }, [posts, posts.length, userPostListLength])

    const addUserPotsInList = () => setUserPostListLength(userPostListLength + nbPostsDisplay)

    return (
        <div className='profile-user-posts'>
            <h3 className='profile-user-posts__title'>Posts:</h3>
            <PostList
                type='profile'
                posts={userPostList}
                user={profileData}
            />
            <div className='profile-user-posts-bottom'>
                {userPostListLength < posts.length &&
                    <Button
                        size="large"
                        endIcon={<ExpandMoreIcon />}
                        onClick={addUserPotsInList}
                    >
                        Afficher plus de posts
                    </Button>
                }
            </div>
        </div>
    )
}
