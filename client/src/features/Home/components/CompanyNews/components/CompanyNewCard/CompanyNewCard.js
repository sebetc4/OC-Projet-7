import React, { useState, forwardRef } from 'react'
import axios from 'axios'

import { IconButton, useMediaQuery, Slide, Dialog } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { CreationDate } from '../../../../../../components'
import { CompanyNewSettings } from './components';
import { CompanyNewForm } from '../index'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompanyNewCard({ userIsAdmin, companyNew, setAllCompanyNews }) {

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');

    // State
    const [showCompanyNewsSettings, setShowCompanyNewsSettings] = useState(false)
    const [showModifyCompanyNew, setShowModifyCompanyNew] = useState(false)

    const handleDeleteCompanyNew = async () => {
        try {
            await axios.delete(`api/company-new/${companyNew.id}`)
            setAllCompanyNews(prev => prev.filter(compNew => compNew.id !== companyNew.id))
        } catch (err) {
            console.log(err)
        }
    }

    const toggleShowCompanyNewsSettings = () => setShowCompanyNewsSettings(prev => !prev)
    const toggleShowModifyCompanyNew = () => setShowModifyCompanyNew(prev => !prev)

    return (
        <>
            <div className='company-new-card-content'>
                <h3 className='company-new-card-content__title'>
                    {companyNew.title}
                </h3>
                <p className='company-new-card-content__date'>
                    <CreationDate
                        format={'Le DD MMMM YYYY'}
                        date={companyNew.createdAt}
                    />
                </p>
                <p className='company-new-card-content__text'>
                    {companyNew.text}
                </p>
            </div>
            {userIsAdmin &&
                <div className='company-new-card-settings-container'>
                    <IconButton
                        onClick={toggleShowCompanyNewsSettings}
                        color="primary"
                        aria-label="Paramètres de commentaire"
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    {showCompanyNewsSettings &&
                        <CompanyNewSettings
                            closeModal={toggleShowCompanyNewsSettings}
                            handleDeleteCompanyNew={handleDeleteCompanyNew}
                            toggleShowModifyCompanyNew={toggleShowModifyCompanyNew}
                        />
                    }
                </div>
            }
            <Dialog
                open={showModifyCompanyNew}
                onClose={toggleShowModifyCompanyNew}
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                keepMounted
                maxWidth={'xl'}
                scroll={'body'}
            >
                <CompanyNewForm
                    type={'modify'}
                    companyNewId={companyNew.id}
                    initialTitle={companyNew.title}
                    initialtext={companyNew.text}
                    closeModal={toggleShowModifyCompanyNew}
                    setAllCompanyNews={setAllCompanyNews}
                />
            </ Dialog>
        </>
    )
}
