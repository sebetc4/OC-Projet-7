import React, { useEffect, useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../config/api.config'

import { Button, Divider, Fab, Dialog, Slide, useMediaQuery, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { CompanyNewForm, CompanyNewCard } from './components';
import { setError } from '../../../../store/actions/errors.actions';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompanyNews() {

    // Params
    const nbCompagnyNewsDisplay = 3

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');
    const dispatch = useDispatch()

    // Store
    const userIsAdmin = useSelector(state => state.user.data.isAdmin)

    // State
    const [allCompanyNews, setAllCompanyNews] = useState([])
    const [companyNewList, setCompanyNewList] = useState([])
    const [companyNewListLength, setCompanyNewListLength] = useState(nbCompagnyNewsDisplay)
    const [showAddCompanyNew, setShowAddCompanyNew] = useState(false)

    // Fetch all news
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const news = await api.get('company-new')
                setAllCompanyNews(news.data)
            } catch {
                dispatch(setError({
                    title: 'Erreur du serveur',
                    message: 'Echec de la récupération des news'
                }))
            }
        }
        fetchNews()
    }, [dispatch])

    // Add news in list
    useEffect(() => {
        if (allCompanyNews) setCompanyNewList(allCompanyNews.slice(0, companyNewListLength))
    }, [allCompanyNews, allCompanyNews.length, companyNewListLength])

    const addUserPotsInList = () => setCompanyNewListLength(prev => prev + nbCompagnyNewsDisplay)

    const toggleShowAddCompanyNew = () => setShowAddCompanyNew(prev => !prev)

    return (
        <Box
            component="section"
            sx={{
                backgroundColor: 'background.section',
            }}
            className='company-news'
        >
            <h2 className='company-news__title'>Les news de l'entreprise</h2>
            {
                userIsAdmin &&
                <div className='company-news__add-news'>
                    <Fab
                        color="secondary"
                        size='small'
                        aria-label="Ajouter une nouvelle"
                        onClick={toggleShowAddCompanyNew}
                    >
                        <AddIcon />
                    </Fab>
                </div>
            }
            {companyNewList.length !== 0 ?

                <ul className='company-news-new-list'>
                    {

                        companyNewList.map((companyNew, index) => (
                            <li
                                key={companyNew.id}
                            >
                                <Box
                                    component="article"
                                    className='company-new-card'
                                >
                                    <CompanyNewCard
                                        userIsAdmin={userIsAdmin}
                                        companyNew={companyNew}
                                        setAllCompanyNews={setAllCompanyNews}
                                    />

                                </Box>
                                {
                                    companyNewList.length !== index + 1 &&
                                    <Divider
                                        className='company-news__divider'
                                    />
                                }
                            </li>
                        ))
                    }
                </ul>
                :
                <div className='company-news-no-new'>
                    <p>Aucune nouvelle</p>
                </div>
            }

            {
                companyNewList.length < allCompanyNews.length &&

                <div className='company-news-bottom'>
                    <Button
                        size="large"
                        endIcon={<ExpandMoreIcon />}
                        onClick={addUserPotsInList}
                    >
                        Afficher plus de news
                    </Button>
                </div>
            }
            <Dialog
                open={showAddCompanyNew}
                onClose={toggleShowAddCompanyNew}
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                keepMounted
                maxWidth={'xl'}
                scroll={'body'}
            >
                <CompanyNewForm
                    type={'create'}
                    initialTitle={''}
                    initialtext={''}
                    closeModal={toggleShowAddCompanyNew}
                    setAllCompanyNews={setAllCompanyNews}
                />
            </ Dialog>

        </Box >
    )
}
