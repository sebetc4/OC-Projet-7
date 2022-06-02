import React, { useEffect, useState, forwardRef } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'

import { Button, Divider, Fab, Dialog, Slide, useMediaQuery } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { CompanyNewForm, CompanyNewCard } from './components';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompanyNews() {

    // Params
    const nbCompagnyNewsDisplay = 3

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');

    // Store
    const userIsAdmin = useSelector(state => state.user.data.isAdmin)

    // State
    const [allCompanyNews, setAllCompanyNews] = useState([])
    const [companyNewList, setCompanyNewList] = useState([])
    const [companyNewListLength, setCompanyNewListLength] = useState(nbCompagnyNewsDisplay)
    const [showAddCompanyNew, setShowAddCompanyNew] = useState(false)

    // Fetch all nbews
    useEffect(() => {
        const fetchNews = async () => {
            const news = await axios.get('api/new')
            setAllCompanyNews(news.data)
        }
        fetchNews()
    }, [])

    // Add news in list
    useEffect(() => {
        if (allCompanyNews) setCompanyNewList(allCompanyNews.slice(0, companyNewListLength))
    }, [allCompanyNews, allCompanyNews.length, companyNewListLength])

    const addUserPotsInList = () => setCompanyNewListLength(prev => prev + nbCompagnyNewsDisplay)

    const toggleShowAddCompanyNew = () => setShowAddCompanyNew(prev => !prev)

    return (
        <section className="company-news">
            <h2 className='company-news__title'>Les news de l'entreprise</h2>
            {
                userIsAdmin &&
                <div className='company-news__add-news'>
                    <Fab
                        color="primary"
                        size='small'
                        aria-label="Ajouter une nouvelle"
                        onClick={toggleShowAddCompanyNew}
                    >
                        <AddIcon />
                    </Fab>
                </div>
            }
            <ul className='company-news-new-list'>
                {companyNewList.length !== 0 ?
                    companyNewList.map((companyNew, index) => (
                        <li>
                            <article
                                className='company-new-card'
                                key={companyNew.id}
                            >
                                <CompanyNewCard
                                    companyNew={companyNew}
                                />
                                {
                                    companyNewList.length !== index + 1 &&
                                    <Divider
                                        className='company-news__divider'
                                    />
                                }
                            </article>
                        </li>
                    ))
                    :
                    <p>Aucune nouvelle</p>
                }
            </ul>
            {
                companyNewList.length < allCompanyNews.length &&

                <div className='company-news-bottom'>
                    <Button
                        size="large"
                        endIcon={<ExpandMoreIcon />}
                        onClick={addUserPotsInList}
                    >
                        Afficher plus de posts
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
        </section >
    )
}
