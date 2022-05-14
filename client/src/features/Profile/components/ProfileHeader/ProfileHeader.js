import React from 'react'

export default function ProfileHeader({ profileData }) {
    return (
        <div className='profile-header'>
            <div className='profile-header__cover-image' >
                <img
                    alt={`Couverture de la page de profil de ${profileData.firstName} ${profileData.lastName}`}
                    src={profileData.coverUrl}
                />
            </div >
            <div className='profile-header__general-information'>
                <img
                    alt={`avatar de ${profileData.firstName} ${profileData.lastName}`}
                    src={profileData.avatarUrl}
                />
                <h2>{`${profileData.firstName} ${profileData.lastName}`}</h2>
            </div>
        </div>
    )
}
