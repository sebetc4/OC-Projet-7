import React from 'react'
import { SettingsImageForm } from './components'

export default function ProfileImageForm({user}) {
  return (
    <div className='settings-profile-images'>
      <SettingsImageForm
        user={user}
        field={'avatar'}
        ratio={1}
        cropShape={'round'}
        showGrid={false}
        picture={user.avatarUrl}
      />
      <SettingsImageForm
        user={user}
        field={'cover'}
        ratio={2.35}
        cropShape={'rect'}
        showGrid={true}
        picture={user.coverUrl}
      />
    </div>
  )
}
