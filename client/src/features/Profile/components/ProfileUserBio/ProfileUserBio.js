import React from 'react'

export default function ProbileUseBio({profileData}) {
    return (
        <div className='profile-user-bio'>
            <h3 className='profile-user-bio__title'>Biographie:</h3>
            <p className='profile-user-bio__content'>{profileData.bio ? profileData.bio : 'Briographie vide...'}</p>
        </div>
    )
}
