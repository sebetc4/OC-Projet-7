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

    // Add posts in list
    useEffect(() => {
        if (posts) setUserPostList(posts.slice(0, userPostListLength))
    }, [posts, posts.length, userPostListLength])

    const addUserPotsInList = () => setUserPostListLength(prev => prev + nbPostsDisplay)

    return (
        <section className='profile-user-posts'>
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
                    <p>Cet utilisateur n'a rien posté.</p>
            }
        </section>
    )
}
