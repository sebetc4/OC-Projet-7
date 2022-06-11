import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { PasswordForm, EmailForm, DeleteAccountForm, ColorModeSettings } from './components';

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
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}

                    >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-top"
                    >
                        <Typography sx={{ width: '75%', flexShrink: 0 }}>
                            Adresse email
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EmailForm
                            user={user}
                            closeAccordion={() => setExpanded(false)}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-top"
                    >
                        <Typography sx={{ width: '75%', flexShrink: 0 }}>
                            Mot de passe
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PasswordForm
                            user={user}
                            closeAccordion={() => setExpanded(false)}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-top"
                    >
                        <Typography sx={{ width: '75%', flexShrink: 0 }}>
                            Désactivation du compte
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DeleteAccountForm
                            closeAccordion={() => setExpanded(false)}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-top"
                    >
                        <Typography sx={{ width: '75%', flexShrink: 0 }}>
                            Mode clair / sombre
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ColorModeSettings
                            closeAccordion={() => setExpanded(false)}
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
        </section>
    )
}
