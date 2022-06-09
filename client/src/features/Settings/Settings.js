import React, { useState } from 'react'
import { useSelector } from "react-redux";


import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';

import { AccountSettings, ProfileSettings } from './components'
import { Divider } from '@mui/material';

export default function Settingss() {

  // Store
  const deviceSize = useSelector(state => state.app.deviceSize)

  // State
  const [value, setValue] = useState('1');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='settings'>
      <TabContext
        value={value}
      >
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Divider />
          <Tabs
            centered
            onChange={handleChange}
            value={value}
            aria-label="Tabs des paramètres"
            indicatorColor="primary"
            textColor='secondary'
          >
            <Tab
              className='settings-tab'
              label={`${deviceSize === 0 ? 'Compte' : 'Paramètres de compte'}`}
              value="1" />
            <Tab
              className='settings-tab'
              label={`${deviceSize === 0 ? 'Profil' : 'Paramètres de profil'}`}
              value="2" />
          </Tabs>
        </Box>
        <TabPanel
          className='settings-section'
          value="1"
        >
          <AccountSettings />
        </TabPanel>
        <TabPanel
          value="2"
          className='settings-section'
        >
          <ProfileSettings />
        </TabPanel>
      </TabContext>
    </div >
  )
}
