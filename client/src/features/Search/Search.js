import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import api from '../../config/api.config'

import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import { Loader } from '../../components';
import { resetPosts, fetchPostsSucess } from '../../store/actions/posts.actions';
import SearchPosts from './components/SearchPost/SearchPosts';
import SearchUsers from './components/SearchUsers/SearchUsers';
import { setError } from '../../store/actions/errors.actions';


export default function Search() {

    // Hooks
    const params = useParams();
    const dispatch = useDispatch()

    // Store
    const deviceSize = useSelector((state) => state.app.deviceSize)
    const posts = useSelector((state) => state.posts)

    // State
    const [tabValue, setTabValue] = useState('1');
    const [usersResult, setUsersResult] = useState(null)
    const [resultsLoaded, setResultsLoaded] = useState(false)


    // Fetch results
    useEffect(() => {
        const getResult = async () => {
            try {
                const results = await api.get(`search/?query=${params.query}`)
                dispatch(fetchPostsSucess(results.data.posts, 'search', true))
                setUsersResult(results.data.users)
            } catch {
                dispatch(setError({
                    title: 'Erreur du serveur',
                    message: 'Echec de la recherche'
                }))
            }
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

    const handleChange = (e, newValue) => setTabValue(newValue);


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
                                        <Box
                                            component="section"
                                            sx={{
                                                backgroundColor: 'background.section',
                                            }} className='search-posts'>
                                            <h2 className='search-posts__title'>
                                                Les posts
                                            </h2>
                                            <SearchPosts
                                                posts={posts.data}
                                            />
                                        </Box>
                                    </div>
                                    <div className='search-columns__column-2'>
                                        <Box
                                            component="section"
                                            sx={{
                                                backgroundColor: 'background.section',
                                            }} className='search-users'
                                        >
                                            <h2 className='search-users__title'>
                                                Les utilisateurs
                                            </h2>
                                            <SearchUsers
                                                users={usersResult}
                                            />
                                        </Box>
                                    </div>
                                </div>
                                :
                                <TabContext value={tabValue}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs
                                            centered
                                            onChange={handleChange}
                                            value={tabValue}
                                            textColor='secondary'
                                        >
                                            <Tab className='search-tab' label="Les posts" value="1" />
                                            <Tab className='search-tab' label="Les utilisateurs" value="2" />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value="1" className='search-tabpanel-posts'>
                                        <SearchPosts
                                            posts={posts.data}
                                        />
                                    </TabPanel>
                                    <TabPanel value="2" className='search-tabpanel-users'>
                                        <SearchUsers
                                            users={usersResult}
                                        />
                                    </TabPanel>
                                </TabContext>
                        }
                    </div>
            }
        </>
    )
}
