import React, { useEffect, useState, forwardRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'


import { Dialog, Slide, useMediaQuery, Box, Tab, Tabs, Fab } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { TabContext, TabPanel } from '@mui/lab';

import api from '../../config/api.config'
import { ChatBox, OnlineUsers, ChatMenu, SearchUser } from './components';
import { setError } from '../../store/actions/errors.actions';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Chat() {

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');
    const dispatch = useDispatch()


    // Store
    const user = useSelector(state => state.user.data)
    const deviceSize = useSelector((state) => state.app.deviceSize)

    // State
    const [value, setValue] = useState('1');
    const [socket, setSocket] = useState(null)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [otherUserCurrentChat, setOtherUserCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [messageReceived, setMessageReceived] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [onlineUsersId, setOnlineUsersId] = useState([])
    const [showSearchUser, setShowSearchUser] = useState(false)
    const [showChatBox, setShowChatBox] = useState(false)


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
                        conversationId: data.convId,
                        User: data.User
                    }
                )
            })
            socket.on('getConversation', data => {
                setConversations(prev => [data.conversation, ...prev])
            })
        }
        return () => socket?.close()
    }, [user, socket])

    // Add current chat in socket server
    useEffect(() => {
        if (currentChat) {
            socket.emit('addConversation', { userId: user.id, convId: currentChat.id })
            setConversations(prev => prev.map(conv => {
                if (conv.id === currentChat.id) {
                    conv.firstUserId === user.id ?
                        conv.unreadMessageFirstUser = 0
                        :
                        conv.unreadMessageSecondUser = 0
                    return conv
                } else
                    return conv
            }))
            deviceSize === 0 && setShowChatBox(true)
        }
    }, [currentChat, socket, user, deviceSize])

    // Fetch all conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const conv = await api.get('conversation')
                setConversations(conv.data)
            } catch (err) {
                dispatch(setError({
                    title: 'Erreur du serveur',
                    message: 'Echec de la récupération des conversations'
                }))
            }
        }
        fetchConversations()
    }, [user, dispatch])

    // Fetch conversation messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messages = await api.get(`message/${currentChat.id}`);
                setMessages(messages.data)
            } catch (err) {
                dispatch(setError({
                    title: 'Erreur du serveur',
                    message: 'Echec de la récupération des messages'
                }))
            }
        }
        if (currentChat)
            fetchMessages()
    }, [currentChat, dispatch])

    // Set other user of current Chat
    useEffect(() => {
        if (currentChat) {
            currentChat.firstUserId === user.id ?
                setOtherUserCurrentChat({ ...currentChat.secondUser, id: currentChat.secondUserId })
                :
                setOtherUserCurrentChat({ ...currentChat.firstUser, id: currentChat.firstUserId })
        }
    }, [currentChat, user])

    // Add message received
    useEffect(() => {
        if (messageReceived) {
            currentChat && otherUserCurrentChat.id === messageReceived.senderId ?
                setMessages(prev => [...prev, messageReceived])
                :
                conversations.forEach(conv => {
                    if (conv.id === messageReceived.conversationId) {
                        conv.firstUserId === user.id ?
                            conv.unreadMessageFirstUser = conv.unreadMessageFirstUser + 1
                            :
                            conv.unreadMessageSecondUser = conv.unreadMessageSecondUser + 1
                    }
                })
        }

        setMessageReceived(null)
    }, [messageReceived, currentChat, otherUserCurrentChat, conversations, user])

    const handleOpenConversation = async (otherUser,) => {
        let existingConversation = false
        let conversation = null
        try {
            conversations.forEach(conv => {
                if (conv.firstUserId === otherUser.id || conv.secondUserId === otherUser.id) {
                    existingConversation = true
                    conversation = conv
                }
            })
            if (!existingConversation) {
                const newConversation = await api.post(`conversation/${otherUser.id}`);
                conversation = newConversation.data
                conversation.firstUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatarUrl: user.avatarUrl,
                }
                conversation.secondUser = {
                    firstName: otherUser.firstName,
                    lastName: otherUser.lastName,
                    avatarUrl: otherUser.avatarUrl,
                }
                socket.emit('newConversation', { otherUserId: otherUser.id, conversation })
            }
            setCurrentChat(conversation)
        } catch (err) {
            dispatch(setError({
                title: 'Erreur du serveur',
                message: 'Echec de la création de la conversation'
            }))
        }
    }

    const toggleShowSearchUser = () => setShowSearchUser(!showSearchUser)

    const handleChange = (e, newValue) => setValue(newValue);

    return (
        <div className='chat'>
            {
                deviceSize !== 0 ?
                    <>
                        <Box
                            component="section"
                            sx={{
                                backgroundColor: 'background.section',
                            }}
                            className='chat-menu'
                        >
                            <ChatMenu
                                deviceSize={deviceSize}
                                setShowChatBox={setShowChatBox}
                                user={user}
                                conversations={conversations}
                                setCurrentChat={setCurrentChat}
                                toggleShowSearchUser={toggleShowSearchUser}
                                onlineUsersId={onlineUsersId}
                            />
                        </Box>
                        <Box
                            component="section"
                            sx={{
                                backgroundColor: 'background.section',
                            }} className='chat-box'
                        >
                            <ChatBox
                                deviceSize={deviceSize}
                                socket={socket}
                                user={user}
                                otherUser={otherUserCurrentChat}
                                currentChat={currentChat}
                                messages={messages}
                                setMessages={setMessages}
                            />
                        </Box>
                        <Box
                            component="section"
                            sx={{
                                backgroundColor: 'background.section',
                            }} className='chat-online'
                        >
                            <OnlineUsers
                                onlineUsers={onlineUsers}
                                user={user}
                                handleOpenConversation={handleOpenConversation}
                            />
                        </Box>
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
                    </>
                    :
                    <>
                        <TabContext value={value}>
                            <Box
                                className='chat-top'
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    backgroundColor: 'background.top'
                                }}
                            >
                                <Tabs
                                    centered
                                    onChange={handleChange}
                                    value={value}
                                    aria-label="Tabs du chat"
                                    indicatorColor="primary"
                                    textColor='secondary'
                                >
                                    <Tab
                                        className='settings-tab'
                                        label='Discussions'
                                        value="1"
                                    />
                                    <Tab
                                        className='settings-tab'
                                        label="En ligne"
                                        value="2" />
                                </Tabs>
                            </Box>
                            <TabPanel value="1">
                                <Box
                                    component="section"
                                    sx={{
                                        backgroundColor: 'background.section',
                                    }} className='chat-menu'
                                >
                                    <ChatMenu
                                        deviceSize={deviceSize}
                                        setShowChatBox={setShowChatBox}
                                        user={user}
                                        conversations={conversations}
                                        setCurrentChat={setCurrentChat}
                                        toggleShowSearchUser={toggleShowSearchUser}
                                        onlineUsersId={onlineUsersId}
                                    />
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">
                                <Box
                                    component="section"
                                    sx={{
                                        backgroundColor: 'background.section',
                                    }} className='chat-online'
                                >
                                    <OnlineUsers
                                        deviceSize={deviceSize}
                                        onlineUsers={onlineUsers}
                                        user={user}
                                        handleOpenConversation={handleOpenConversation}
                                    />
                                </Box>
                            </TabPanel>
                        </TabContext>
                        <div className='chat__search-button-container'>
                            <Fab
                                color='secondary'
                                aria-label='Rechercher un utilisateur'
                                onClick={toggleShowSearchUser}
                            >
                                <PersonSearchIcon
                                    fontSize='large'
                                />
                            </Fab>
                        </div>
                        <Dialog
                            open={showChatBox}
                            TransitionComponent={Transition}
                            fullScreen={true}
                            keepMounted
                            maxWidth={'xl'}
                            scroll={'body'}
                        >
                            <Box
                                component="section"
                                sx={{
                                    backgroundColor: 'background.section',
                                }} className='chat-box'
                            >
                                <ChatBox
                                    deviceSize={deviceSize}
                                    setShowChatBox={setShowChatBox}
                                    socket={socket}
                                    user={user}
                                    otherUser={otherUserCurrentChat}
                                    currentChat={currentChat}
                                    messages={messages}
                                    setMessages={setMessages}
                                />
                            </Box>
                        </ Dialog>
                        <Dialog
                            open={showSearchUser}
                            TransitionComponent={Transition}
                            fullScreen={true}
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
                    </>
            }
        </div>
    )
}
