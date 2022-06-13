import React, { useState, forwardRef } from 'react'
import api from '../../../../../../config/api.config'

import { IconButton, useMediaQuery, Slide, Dialog } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { ConfirmModal, CreationDate } from '../../../../../../components'
import { CompanyNewSettings } from './components';
import { CompanyNewForm } from '../index'
import { useDispatch } from 'react-redux';
import { setError } from '../../../../../../store/actions/errors.actions';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompanyNewCard({ userIsAdmin, companyNew, setAllCompanyNews }) {

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');
    const dispatch = useDispatch()

    // State
    const [showCompanyNewsSettings, setShowCompanyNewsSettings] = useState(false)
    const [showModifyCompanyNew, setShowModifyCompanyNew] = useState(false)
    const [showDeleteConfirmModale, setShowDeleteConfirmModale] = useState(false)

    const handleDeleteCompanyNew = async () => {
        try {
            await api.delete(`company-new/${companyNew.id}`)
            setAllCompanyNews(prev => prev.filter(compNew => compNew.id !== companyNew.id))
        } catch (err) {
            dispatch(setError({
                title: 'Erreur du serveur',
                message: 'Echec de l\'envoi du message'
            }))
        }
    }

    const toggleShowCompanyNewsSettings = () => setShowCompanyNewsSettings(prev => !prev)
    const toggleShowModifyCompanyNew = () => setShowModifyCompanyNew(prev => !prev)
    const toggleShowDeleteConfirmModale = () => setShowDeleteConfirmModale(prev => !prev)

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
                        color='secondary'
                        onClick={toggleShowCompanyNewsSettings}
                        aria-label="Paramètres de la nouvelle"
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    {showCompanyNewsSettings &&
                        <CompanyNewSettings
                            closeModal={toggleShowCompanyNewsSettings}
                            toggleShowDeleteConfirmModale={toggleShowDeleteConfirmModale}
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
            <ConfirmModal
                title={'Confirmer la supression de la new'}
                content={`Voulez vous vraiment supprimer cette new?`}
                button='Supprimer'
                showConfirmModale={showDeleteConfirmModale}
                toggleShowConfirmModale={toggleShowDeleteConfirmModale}
                onClickConfirm={handleDeleteCompanyNew}
            />
        </>
    )
}
