import React, { useState } from 'react'
import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import { TextField, IconButton } from '@mui/material';


import ChatUserCard from '../ChatUserCard/ChatUserCard';

export default function SearchUser({ user, toggleShowSearchUser, handleOpenConversation, onlineUsersId }) {

    // State
    const [resultSearch, setResultSearch] = useState([])
    const [query, setQuery] = useState('')

    const fetchSearch = async (e) => {
        setQuery(e.target.value)
        if (e.target.value) {
            const result = await axios.get(`/api/search/chat-search/?query=${e.target.value.replaceAll(' ', '+')}`)
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
                value={query}
            />
            <div className="chat-search-user-content">
                {
                    resultSearch.map(userInResult =>
                        <article
                            key={userInResult.id}
                            className='chat-user-card'
                            onClick={() => {
                                handleOpenConversation(userInResult)
                                toggleShowSearchUser()
                                setQuery('')
                                setResultSearch([])
                            }
                        }
                        >
                            <ChatUserCard
                                userInCard={userInResult}
                                userInCardIsOnline={onlineUsersId.includes(userInResult.id)}
                                unreadMessages={0}
                            />
                        </article>
                    )
                }
            </div>
        </div>
    )
}
