import React, { useState, useEffect } from 'react'

import { Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { PostList } from '../../../../components'

export default function ProfileUserPosts({ profileData, posts }) {

    // Params
    const nbPostsDisplay = 3

    // State
    const [userPostList, setUserPostList] = useState([])
    const [userPostListLength, setUserPostListLength] = useState(nbPostsDisplay)

    // Add posts in list
    useEffect(() => {
        if (posts) setUserPostList(posts.slice(0, userPostListLength))
    }, [posts, posts.length, userPostListLength])

    const addUserPotsInList = () => setUserPostListLength(prev => prev + nbPostsDisplay)

    return (
        <Box
            component="section"
            sx={{
                backgroundColor: 'background.section',
            }}
            className='profile-user-posts'
        >
            <h2 className='profile-user-posts__title'>Posts:</h2>
            {
                userPostList.length !== 0 ?
                    <>
                        <PostList
                            type='profile'
                            posts={userPostList}
                            user={profileData}
                        />
                        {userPostListLength < posts.length &&
                            <div className='profile-user-posts-bottom'>
                                <Button
                                    color='secondary'
                                    size="large"
                                    endIcon={<ExpandMoreIcon />}
                                    onClick={addUserPotsInList}
                                >
                                    Afficher plus de posts
                                </Button>
                            </div>
                        }
                    </>
                    :
                    <div className='profile-user-posts__no-post'>
                        <p>Cet utilisateur n'a rien posté.</p>
                    </div>
            }
        </Box>
    )
}
