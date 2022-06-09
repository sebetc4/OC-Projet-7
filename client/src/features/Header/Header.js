import React from 'react'
import { GroupomaniaLogoSvg } from '../../components'
import { Navbar, SearchBar, RightMenu, MobileMenu } from './components'
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayMobileMenu } from '../../store/actions/app.actions';

import { Divide as Hamburger } from 'hamburger-react'
import { Box, Divider } from '@mui/material';


export default function Header() {

  // Hooks
  const dispatch = useDispatch()

  // State
  const deviceSize = useSelector((state) => state.app.deviceSize)
  const displayMobileMenu = useSelector((state) => state.app.displayMobileMenu)
  const colorMode = useSelector(state => state.app.colorMode)

  const toggleDisplayMobileMenu = () => dispatch(setDisplayMobileMenu(!displayMobileMenu))

  return (
    <>
      <Box
        component='header'
        sx={{
          backgroundColor: 'background.header',
        }}
        className={`header ${colorMode === 'dark' ? 'header--dark' : ''}`}
      >
        <div className='header__components--left'>
          {deviceSize === 2 ?
            <GroupomaniaLogoSvg className={'header-components-left__logo'} /> :
            <div className='header-components-left__button-container'>
              <Hamburger
                color={colorMode === 'light' ? '#2b60d0' : '#7195e1'}
                rounded
                toggled={displayMobileMenu}
                toggle={toggleDisplayMobileMenu}
                label='Menu de navigation'
                hideOutline={false}
              />
            </div>
          }
          <SearchBar />
        </div>
        {deviceSize === 2 &&
          <>
            <div className='header__components--center'>
              <Navbar />
            </div>
            <div className='header__components--right'>
              <RightMenu />
            </div>
          </>
        }
        <Divider className='header__divider' />
      </Box>
      <MobileMenu
        displayMobileMenu={displayMobileMenu}
        toggleDisplayMobileMenu={toggleDisplayMobileMenu}
      />
    </>
  )
}

