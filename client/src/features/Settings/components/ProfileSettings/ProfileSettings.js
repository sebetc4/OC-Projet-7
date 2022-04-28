import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { firstNameLastNameValidation, bioValidation } from '../forms/utils/validationSchemas'
import { SettingForm, ImageForm } from '../index'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProfileSettings() {

    const user = useSelector((state) => state.user.data)
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
                            Nom et prènom
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingForm
                            inputs={[{
                                name: 'firstName',
                                type: 'text',
                                placeholder: 'Prénom'
                            }, {
                                name: 'lastName',
                                type: 'text',
                                placeholder: 'Nom'
                            }]}
                            initialValues={
                                {
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                }
                            }
                            validationSchemas={firstNameLastNameValidation}
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
                            Images
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='settings-section-pictures' >
                            <ImageForm
                                field={'avatar'}
                                ratio={1}
                                cropShape={'round'}
                                showGrid={false}
                                picture={user.avatarUrl}
                            />
                            <ImageForm
                                user={user}
                                field={'cover'}
                                ratio={2.375}
                                cropShape={'rect'}
                                showGrid={true}
                                picture={user.coverUrl}
                            />
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Biographie
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingForm
                            inputs={[{
                                name: 'bio',
                                type: 'text',
                                placeholder: 'Bio'
                            }]}
                            initialValues={
                                {
                                    bio: `${user.bio ? user.bio : ''}`,
                                }
                            }
                            validationSchemas={bioValidation}
                            action='updateUser'
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
        </section>
    )
}
