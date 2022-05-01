import React from 'react'
import { GroupomaniaLogoSvg } from '../../components'
import { Navbar, SearchBar, RightMenu, MobilMenu } from './components'
import { useSelector } from "react-redux";

export default function Header() {

  const deviceSize = useSelector((state) => state.app.deviceSize)


  return (

    <>
      {deviceSize ?
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
        </header> :

        <MobilMenu />
      }
    </>







  )
}

