import React, { useState } from 'react'
import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import { TextField, IconButton } from '@mui/material';
import { SearchUserCard } from './Components';

export default function SearchUser({ user, toggleShowSearchUser, handleOpenConversation, onlineUsersId }) {

    // State
    const [resultSearch, setResultSearch] = useState([])

    const fetchSearch = async (e) => {
        if (e.target.value) {
            const query = `?query=${e.target.value.replaceAll(' ', '+')}`
            const result = await axios.get(`/api/search/chat-search/${query}`)
            result.data = result.data.filter(userInResult => userInResult.id !== user.id)
            setResultSearch(result.data)
        } else
            setResultSearch([])
    }

    return (
        <div className='chat-search-user'>
            <div className='chat-search-user-top'>
                <h2>Rechercher un utilisateur</h2>
                <div className='chat-search-user-top__button-container'>
                    <IconButton
                        color="error"
                        aria-label="Retour en arrière"
                        onClick={toggleShowSearchUser}
                    >
                        <CloseIcon color='error' fontSize='medium' />
                    </IconButton>
                </div>
            </div>
            <TextField
                size="small"
                className="chat-search-user-input"
                id="chat-search-user__search-input"
                label="Nom ou prénom de l'utilisateur"
                onChange={fetchSearch}
                variant="standard"
            />
            <div className="chat-search-user-content">
                {
                    resultSearch.map(userInResult =>
                        <SearchUserCard
                            key={userInResult.id}
                            userInResult={userInResult}
                            handleOpenConversation={handleOpenConversation}
                            onlineUsersId={onlineUsersId}
                        />
                    )
                }
            </div>
        </div>
    )
}
