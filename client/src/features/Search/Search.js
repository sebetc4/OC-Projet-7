import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios'

import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import { Loader, UserCardList } from '../../components';
// import SmallPostList from '../../components/SmallPostsList/SmallPostsList';


export default function Search() {

    // Hooks
    const params = useParams();

    // Store
    const deviceSize = useSelector((state) => state.app.deviceSize)

    // State
    const [value, setValue] = useState('1');
    const [postsResult, setPostsResult] = useState(null)
    const [usersResult, setUsersResult] = useState(null)
    const [resultLoaded, setResultLoaded] = useState(false)

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getResult = async () => {
            const results = await axios.get(`/api/search/?${params.query}`)
            setPostsResult(results.data.posts)
            setUsersResult(results.data.users)
            setResultLoaded(true)
        }
        getResult()
    }, [params.query])
    return (
        <>
            {
                !resultLoaded ?
                    <Loader /> :
                    <div className='search'>
                        <h1 className='search__title'>Réslultat de la recherche "{params.query.split('query=')[1].replace('&', ' ').slice(0, -1)}"</h1>
                        {
                            deviceSize === 2 ?
                                <div className='search-columns'>
                                    <div className='search-columns__column-1'>
                                        <section className='search-posts'>
                                            <h2 className='search-posts__title'>
                                                Les posts
                                            </h2>
                                            {/* {
                                                postsResult.length !== 0 ?
                                                    <SmallPostList
                                                        type='search'
                                                        posts={postsResult}
                                                    /> :
                                                    <p>Aucun post pour votre recherche</p>
                                            } */}
                                        </section>
                                    </div>
                                    <div className='search-columns__column-2'>
                                        <section className='search-users'>
                                            <h2 className='search-users__title'>
                                                Les utilisateurs
                                            </h2>
                                            {
                                                usersResult.length !== 0 ?
                                                    <UserCardList
                                                        users={usersResult}

                                                    /> :
                                                    <p>Aucun utilisateur pour votre recherche</p>
                                            }
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
