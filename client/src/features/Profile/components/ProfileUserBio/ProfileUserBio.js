import React from 'react'

export default function ProbileUseBio({profileData}) {
    return (
        <section className='profile-user-bio'>
            <h2 className='profile-user-bio__title'>Biographie:</h2>
            <p className='profile-user-bio__content'>{profileData.bio ? profileData.bio : 'Briographie vide...'}</p>
        </section>
    )
}
