import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';

import { AccountSettings, ProfileSettings } from './components'
import { Divider } from '@mui/material';

export default function Settingss() {

  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='settings'>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Divider />
          <Tabs 
          centered
          onChange={handleChange} 
          value={value}
          >
            <Tab className='settings-tab' label="Paramètres de compte" value="1" />
            <Tab className='settings-tab' label="Paramètres de profil" value="2" />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <AccountSettings />
        </TabPanel>
        <TabPanel value="2">
          <ProfileSettings />
        </TabPanel>
      </TabContext>
    </div>
  )
}
