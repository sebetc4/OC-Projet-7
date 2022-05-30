import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import { Loader, UserCardList } from '../../components';
import { resetPosts, fetchPostsSucess } from '../../store/actions/posts.actions';
import SearchPosts from './components/SearchPost/SearchPosts';
import SearchUsers from './components/SearchUsers/SearchUsers';


export default function Search() {

    // Hooks
    const params = useParams();
    const dispatch = useDispatch()

    // Store
    const deviceSize = useSelector((state) => state.app.deviceSize)
    const posts = useSelector((state) => state.posts)

    // State
    const [value, setValue] = useState('1');
    const [usersResult, setUsersResult] = useState(null)
    const [resultsLoaded, setResultsLoaded] = useState(false)

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    // Fetch results
    useEffect(() => {
        const getResult = async () => {
            const results = await axios.get(`/api/search/?query=${params.query}`)
            dispatch(fetchPostsSucess(results.data.posts, 'search', true))
            setUsersResult(results.data.users)
        }
        getResult()
        return () => dispatch(resetPosts())
    }, [params.query, dispatch])

    // Check if results loaded
    useEffect(() => {
        if (posts.type === 'search' && usersResult)
            setResultsLoaded(true)
        else
            setResultsLoaded(false)
    }, [posts, usersResult])

    return (
        <>
            {
                !resultsLoaded ?
                    <Loader /> :
                    <div className='search'>
                        <h1 className='search__title'>Réslultat de la recherche "{params.query}"</h1>
                        {
                            deviceSize === 2 ?
                                <div className='search-columns'>
                                    <div className='search-columns__column-1'>
                                        <section className='search-posts'>
                                            <h2 className='search-posts__title'>
                                                Les posts
                                            </h2>
                                            <SearchPosts
                                                posts={posts.data}
                                            />
                                        </section>
                                    </div>
                                    <div className='search-columns__column-2'>
                                        <section className='search-users'>
                                            <h2 className='search-users__title'>
                                                Les utilisateurs
                                            </h2>
                                            <SearchUsers
                                                users={usersResult}
                                            />
                                        </section>
                                    </div>
                                </div> :
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs
                                            centered
                                            onChange={handleChange}
                                            value={value}
                                        >
                                            <Tab className='settings-tab' label="Les posts" value="1" />
                                            <Tab className='settings-tab' label="Les utilisateurs" value="2" />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value="1">
                                        {/* {
                                            postsResult.length !== 0 ?
                                                <SmallPostList
                                                    type='search'
                                                    posts={postsResult}
                                                /> :
                                                <p>Aucun post pour votre recherche</p>
                                        } */}
                                    </TabPanel>
                                    <TabPanel value="2">
                                        {
                                            usersResult.length !== 0 ?
                                                <UserCardList
                                                    users={usersResult}

                                                /> :
                                                <p>Aucun utilisateur pour votre recherche</p>
                                        }
                                    </TabPanel>
                                </TabContext>
                        }
                    </div>
            }
        </>
    )
}
