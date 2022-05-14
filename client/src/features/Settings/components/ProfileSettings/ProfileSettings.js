import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FirstNameLastNameForm, ProfileImageForm, BiographyForm } from './components'

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
                            Prénom et nom
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FirstNameLastNameForm
                            user={user}
                            closeAccordion={() => setExpanded(false)}
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
                        <ProfileImageForm
                            user={user}
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
                            Biographie
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <BiographyForm
                            user={user}
                            closeAccordion={() => setExpanded(false)}
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
        </section>
    )
}
