import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

import { Divider, IconButton } from '@mui/material'
import { TextareaAutosize } from '@mui/base';
import { Message } from './components';

import SendIcon from '@mui/icons-material/Send';
import { Loader } from '../../../../components';

export default function ChatBox({ socket, user, currentChat, otherUser, messages, setMessages }) {

    // Hooks
    const chatBoxContentRef = useRef()

    // State
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {

    })

    // Scrool bottom when new message
    useEffect(() => {
        chatBoxContentRef.current && chatBoxContentRef.current.scrollTo({ top: chatBoxContentRef.current.scrollHeight, behavior: "smooth" })
    }, [messages])

    const submitNewMessage = async (e) => {
        console.log(socket.id)
        e.preventDefault()
        try {
            const User = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl
            }
            socket.emit('sendMessage', {
                senderId: user.id,
                receiverId: otherUser.id,
                message: newMessage,
                User
            })
            const res = await axios.post(`/api/message/${currentChat.id}`, { message: newMessage })

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
                                    < div className='chat-box-top' >
                                        <img
                                            src={otherUser.avatarUrl}
                                            alt={`Avatar de ${otherUser.firstName} ${otherUser.lastName}`}
                                        />
                                        <h2>{`${otherUser.firstName} ${otherUser.lastName}`}</h2>
                                    </div >

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
                                    <div className='chat-box-bottom'>
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
                                                    color='primary'
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </div>
                                        </form>
                                    </div>
                                </>

                                :
                                <Loader />
                        }

                    </>
                    :
                    <div className='chat-box-no-user'>
                        <p>Ouvrir une conversation pour commencer à parler.</p>

                    </div>
            }
        </>
    )
}
