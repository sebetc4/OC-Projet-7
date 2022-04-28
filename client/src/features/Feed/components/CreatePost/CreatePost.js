import React, { useState } from 'react'
import { PostForm } from '../index'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { StandartModal } from '../../../../components';


export default function CreatePost() {

    const [displayCreatePost, setDisplayCreatePost] = useState(false)

    const toggleDisplayCreatePost = () => setDisplayCreatePost(!displayCreatePost)

    return (
        <div className='create-post'>
            <Fab
                onClick={toggleDisplayCreatePost}
                color="primary"
                variant="extended"
            >
                <AddIcon sx={{ mr: 2 }} />
                Ajouter une publication
            </Fab>
            {displayCreatePost &&
                <StandartModal
                    closeModal={toggleDisplayCreatePost}
                    closeClickOut={false}
                >
                        <PostForm
                            closeModal={toggleDisplayCreatePost}
                            initialValueText={''}
                        />
                </StandartModal>
            }
        </div>
    )
}
