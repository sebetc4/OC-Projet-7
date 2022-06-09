import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

import { Box, Divider, IconButton } from '@mui/material'
import { TextareaAutosize } from '@mui/base';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { Message } from './components';
import { Loader } from '../../../../components';

export default function ChatBox({ deviceSize, socket, user, currentChat, otherUser, messages, setMessages, setShowChatBox }) {

    // Hooks
    const chatBoxContentRef = useRef()

    // State
    const [newMessage, setNewMessage] = useState('')

    // Scrool bottom when new message
    useEffect(() => {
        chatBoxContentRef.current && chatBoxContentRef.current.scrollTo({ top: chatBoxContentRef.current.scrollHeight, behavior: "smooth" })
    }, [messages])

    const submitNewMessage = async (e) => {
        e.preventDefault()
        try {
            const User = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl
            }
            const res = await axios.post(`/api/message/${currentChat.id}`, { message: newMessage })
            socket.emit('sendMessage', {
                senderId: user.id,
                receiverId: otherUser.id,
                convId: currentChat.id,
                message: newMessage,
                createdAt: res.data.createdAt,
                User
            })
            const message = {
                ...res.data,
                User
            }
            setMessages([...messages, message])
            setNewMessage('')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {
                currentChat ?
                    <>
                        {
                            otherUser ?
                                <>
                                    <Box
                                        component="div"
                                        sx={{
                                            backgroundColor: 'background.top',
                                        }}
                                        className='chat-box-top'
                                    >
                                        <img
                                            src={otherUser.avatarUrl}
                                            alt={`Avatar de ${otherUser.firstName} ${otherUser.lastName}`}
                                        />
                                        <h2>{`${otherUser.firstName} ${otherUser.lastName}`}</h2>
                                        {
                                            deviceSize === 0 &&
                                            <div className='chat-box-top__button-container'>
                                                <IconButton
                                                    color="error"
                                                    aria-label="Retour"
                                                    onClick={() => setShowChatBox(false)}
                                                >
                                                    <CloseIcon color='error' fontSize='medium' />
                                                </IconButton>
                                            </div>
                                        }

                                    </Box >

                                    <div
                                        className='chat-box-content'
                                        ref={chatBoxContentRef}
                                    >

                                        {
                                            messages && messages.map((mes, index) =>
                                                <Message
                                                    key={index}
                                                    message={mes}
                                                    userIsSender={mes.senderId === user.id}
                                                />
                                            )
                                        }
                                    </div>
                                    <Box
                                        component="div"
                                        sx={{
                                            backgroundColor: 'background.top',
                                        }}
                                        className='chat-box-bottom'
                                    >
                                        <form
                                            onSubmit={submitNewMessage}
                                            className="chat-box-bottom-form"
                                        >
                                            <div className='chat-box-bottom-form-textarea'>
                                                <label className='chat-box-bottom-form-textarea__label' htmlFor='settings-form-textarea'>Biographie</label>
                                                <TextareaAutosize
                                                    id='chat-box-input'
                                                    maxLength={300}
                                                    maxRows={4}
                                                    className='chat-box-bottom-form-textarea__input'
                                                    name='message'
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                                                    placeholder='Votre message...'
                                                />
                                            </div>
                                            <Divider
                                                className="chat-tech-dep-box-bottom-form__divider"
                                                sx={{ height: 40 }}
                                                orientation="vertical"
                                            />

                                            <div>
                                                <IconButton
                                                    type="submit"
                                                    aria-label="Envoyer"
                                                    disabled={newMessage === ''}
                                                    color='secondary'
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </div>
                                        </form>
                                    </Box>
                                </>
                                :
                                <Loader />
                        }

                    </>
                    :
                    <div className='chat-box-no-chat'>
                        <p>Ouvrir une conversation pour commencer à parler</p>
                    </div>
            }
        </>
    )
}
