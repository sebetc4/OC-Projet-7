import React from 'react'
import { CreationDate } from '../../../../components';


export default function ProfileUserInformation({ profileData }) {
    return (
        <div className='profile-user-information'>
            <h3 className='profile-user-information__title'>Informations:</h3>
            <div className='profile-user-information__content'>
                <p>{'Membre depuis le '}
                    <CreationDate
                        format={'DD/MM/YYYY'}
                        date={profileData.createdAt}
                    />
                </p>
            </div>
        </div>
    )
}
