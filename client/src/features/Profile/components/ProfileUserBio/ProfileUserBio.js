import { Box } from '@mui/material'
import React from 'react'

export default function ProbileUseBio({ profileData }) {
    return (
        <Box
            component="section"
            sx={{
                backgroundColor: 'background.section',
            }}
            className='profile-user-bio'
        >
            <h2 className='profile-user-bio__title'>Biographie:</h2>
            {profileData.bio && profileData.bio !== '' ?
                <p className='profile-user-bio__content'>{profileData.bio}</p>
                :
                <div className='profile-user-bio__no-bio'>
                    <p>Cet utilisateur n'a pas de biographie</p>
                </div>
            }

        </Box>
    )
}
