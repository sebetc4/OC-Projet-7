import React, { useEffect, useState, forwardRef } from 'react'
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'
import axios from 'axios';

import { Dialog, Slide, useMediaQuery } from '@mui/material';

import { ChatBox, OnlineUsers, ChatMenu, SearchUser } from './components';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Chat() {

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');


    // Store
    const user = useSelector(state => state.user.data)

    // State
    const [socket, setSocket] = useState(null)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [otherUserCurrentChat, setOtherUserCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [messageReceivded, setMessageReceived] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [onlineUsersId, setOnlineUsersId] = useState([])
    const [showSearchUser, setShowSearchUser] = useState(false)

    // Init socket
    useEffect(() => {
        setSocket(io())
    }, [])

    // Add user in socket server, init getUsers ans getMessage
    useEffect(() => {
        if (socket) {
            socket.emit('addUser', user.id)
            socket.on('getUsers', users => {
                const usersId = users.map(user => user.userId)
                setOnlineUsers(users)
                setOnlineUsersId(usersId)

            })
            socket.on('getMessage', data => {
                setMessageReceived(
                    {
                        senderId: data.senderId,
                        message: data.message,
                        createdAt: data.createdAt,
                        User: data.User
                    }
                )
            })
        }
        return () => socket?.close()
    }, [user, socket])

    // Fetch all conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const conv = await axios.get('/api/conversation')
                setConversations(conv.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchConversations()
    }, [user])

    // Fetch conversation messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messages = await axios.get(`/api/message/${currentChat.id}`);
                setMessages(messages.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (currentChat)
            fetchMessages()
    }, [currentChat])

    // Set other user of current Chat
    useEffect(() => {
        if (currentChat) {
            if (currentChat.firstUserId === user.id)
                setOtherUserCurrentChat({...currentChat.secondUser, id: currentChat.secondUserId} )
            else
                setOtherUserCurrentChat({...currentChat.firstUser, id: currentChat.firstUserId})
        }
    }, [currentChat, user])

    // Add message received
    useEffect(() => {
        if (messageReceivded && currentChat && otherUserCurrentChat.id === messageReceivded.senderId)
            setMessages(prev => [...prev, messageReceivded])
        setMessageReceived(null)
    }, [messageReceivded, currentChat, otherUserCurrentChat])

    const handleOpenConversation = async (otherUserId) => {
        let existingConversation = false
        let conversation = null
        try {
            conversations.forEach(conv => {
                if (conv.firstUserId === otherUserId || conv.secondUserId === otherUserId) {
                    existingConversation = true
                    conversation = conv
                }
            })
            if (!existingConversation) {
                const newConversation = await axios.post(`/api/conversation/${otherUserId}`);
                conversation = newConversation.data
                conversation.firstUser = {
                    firsName: user.firsName,
                    lastName: user.lastName,
                    avatarUrl: user.avatarUrl,

                }
            }
            setCurrentChat(conversation)
        } catch (err) {
            console.log(err)
        }
    }

    const toggleShowSearchUser = () => setShowSearchUser(!showSearchUser)

    return (
        <div className='chat'>
            <section className='chat-menu'>
                <ChatMenu
                    user={user}
                    conversations={conversations}
                    setCurrentChat={setCurrentChat}
                    toggleShowSearchUser={toggleShowSearchUser}
                    onlineUsersId={onlineUsersId}
                />
            </section>
            <section className='chat-box'>
                <ChatBox
                    socket={socket}
                    user={user}
                    otherUser={otherUserCurrentChat}
                    currentChat={currentChat}
                    messages={messages}
                    setMessages={setMessages}
                />
            </section>
            <section className='chat-online'>
                <OnlineUsers
                    onlineUsers={onlineUsers}
                    user={user}
                    handleOpenConversation={handleOpenConversation}
                />
            </section>
            <Dialog
                open={showSearchUser}
                onClose={toggleShowSearchUser}
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                keepMounted
                maxWidth={'xl'}
                scroll={'body'}
            >
                <SearchUser
                    toggleShowSearchUser={toggleShowSearchUser}
                    user={user}
                    handleOpenConversation={handleOpenConversation}
                    onlineUsersId={onlineUsersId}
                />
            </ Dialog>
        </div>
    )
}
