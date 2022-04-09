import React from 'react'
import { SvgGroupomaniaLogo } from '../index'
import { Navbar, SearchBar, SettingsBar } from './components'
export default function Header() {
  return (
    <header className='header'>
      <div className='header__components--left'>
        <SvgGroupomaniaLogo className={'header-logo'} />
        <SearchBar />
      </div>
      <div className='header__components--center'>
        <Navbar />
      </div>
      <div className='header__components--right'>
        <SettingsBar />
      </div>
    </header>
  )
}

