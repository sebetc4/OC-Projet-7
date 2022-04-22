import React from 'react'
import { GroupomaniaLogoSvg } from '../../components'
import { Navbar, SearchBar, RightMenu } from './components'
export default function Header() {
  return (
    <header className='header'>
      <div className='header__components--left'>
        <GroupomaniaLogoSvg className={'header-logo'} />
        <SearchBar />
      </div>
      <div className='header__components--center'>
        <Navbar />
      </div>
      <div className='header__components--right'>
        <RightMenu />
      </div>
    </header>
  )
}

