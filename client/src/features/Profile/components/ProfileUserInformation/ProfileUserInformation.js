import React from 'react'
import { CreationDate } from '../../../../components';


export default function ProfileUserInformation({ profileData }) {
    return (
        <section className='profile-user-information'>
            <h2 className='profile-user-information__title'>Informations:</h2>
            <div className='profile-user-information__content'>
                <p>{'Membre depuis le '}
                    <CreationDate
                        format={'DD/MM/YYYY'}
                        date={profileData.createdAt}
                    />
                </p>
            </div>
        </section>
    )
}
