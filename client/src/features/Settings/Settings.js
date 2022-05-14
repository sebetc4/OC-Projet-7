import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { AccountSettings, ProfileSettings } from './components'

export default function Settingss() {

  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='settings'>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab className='settings-tab' label="Paramètres de compte" value="1" />
            <Tab className='settings-tab' label="Paramètres de profil" value="2" />
            <Tab className='settings-tab' label="Autre" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AccountSettings />
        </TabPanel>
        <TabPanel value="2">
          <ProfileSettings />
        </TabPanel>
        <TabPanel value="3">
          Autre
        </TabPanel>
      </TabContext>
    </div>
  )
}
