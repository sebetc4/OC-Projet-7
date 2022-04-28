import React, {useState} from 'react'
import { useSelector } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { emailValidation, passwordValidation, deleteAccountValidation } from '../forms/utils/validationSchemas'
import { SettingForm } from '../index'

export default function AccountSettings() {

    // Store
    const user = useSelector((state) => state.user.data)

    // State
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <section className='settings-section'>
            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '50', flexShrink: 0 }}>
                            Adresse email
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingForm
                            inputs={[{
                                name: 'email',
                                type: 'email',
                                placeholder: 'Email'
                            }]}
                            initialValues={
                                {
                                    email: user.email,
                                }
                            }
                            validationSchemas={emailValidation}
                            action='updateUser'
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '50%', flexShrink: 0 }}>
                            Mot de passe
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingForm
                            inputs={[{
                                name: 'password',
                                type: 'password',
                                placeholder: 'Ancien mot de passe'
                            }, {
                                name: 'newPassword',
                                type: 'password',
                                placeholder: 'Nouveau mot de passe'
                            }, {
                                name: 'confirmNewPassword',
                                type: 'password',
                                placeholder: 'Confirmation du nouveau mot de passe'
                            }]}
                            initialValues={
                                {
                                    password: '',
                                    newPassword: '',
                                    confirmNewPassword: ''
                                }
                            }
                            validationSchemas={passwordValidation}
                            action='updatePassword'
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Supression du compte
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingForm
                            inputs={[{
                                name: 'password',
                                type: 'password',
                                placeholder: 'Mot de passe'
                            }, {
                                name: 'confirmPassword',
                                type: 'password',
                                placeholder: 'Confirmation du mot de passe'
                            }]}
                            initialValues={
                                {
                                    password: '',
                                    confirmPassword: ''
                                }
                            }
                            validationSchemas={deleteAccountValidation}
                            action='deleteAccount'
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
        </section>
    )
}
