import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux'


import { Divider, TextField, Slide, IconButton, Fab, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { LoaderMessage, TechMessage, UserMessage } from './components';

export default function ChatTechDep() {

    // Hooks
    const chatBoxContentRef = useRef()

    // Store
    const user = useSelector((state) => state.user.data)
    const deviceSize = useSelector(state => state.app.deviceSize)
    const colorMode = useSelector(state => state.app.colorMode)

    // State
    const [showChatBox, setShowChatBox] = useState(false)
    const [sendMessage, setSendMessage] = useState(`Human: Bonjour je m'appelle ${user.firstName} ${user.lastName}, j'ai un problème.\nAI:Bonjour, je travail au service technique de Groumpomania comment puis-je vous aider?`)
    const [messageList, setMessageList] = useState([`Bonjour ${user.firstName}, comment puis-je vous aider?`])
    const [userMessage, setUserMessage] = useState(null)
    const [resIsLoading, setResIsLoading] = useState(false)

    const settingsSchema = Yup.object().shape({
        message: Yup
            .string()
            .min(1)
            .required(),
    });

    // Scroll to chat box bottom when new message
    useEffect(() => {
        chatBoxContentRef.current && chatBoxContentRef.current.scrollTo({ top: chatBoxContentRef.current.scrollHeight, behavior: "smooth" })
    }, [messageList, resIsLoading])

    // Split sendMessage when it's too long
    useEffect(() => {
        if (sendMessage.length > 800) {
            setSendMessage(prev => prev.split('\n').splice(4).toString())
        }
    }, [sendMessage])

    // Fetch open-ai response and set state
    useEffect(() => {
        const fetchResponse = async () => {
            setResIsLoading(true)
            const message = `${sendMessage}Human:${userMessage}\nAI:`
            const res = await axios.post(`/api/open-ai/`, { message })
            setSendMessage(prev => `${prev}Human:${userMessage}\nAI:` + res.data + '\n')
            setResIsLoading(false)
            setMessageList(prev => [...prev, res.data.replaceAll('Human:', '').replaceAll('AI:', '').replaceAll('\n', '')])
        }
        if (userMessage) fetchResponse()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userMessage])

    const submit = (values, actions) => {
        const mess = values.message
        values.message = ''
        setMessageList(prev => [...prev, mess])
        setUserMessage(mess)
    };

    const toggleShowChatBox = () => setShowChatBox(!showChatBox)

    return (
        <section className='chat-tech-dep'>
            {
                deviceSize === 2 &&
                <Fab
                    className='chat-tech-dep-button'
                    color="secondary"
                    aria-label="Fermet le chat"
                    onClick={toggleShowChatBox}
                >
                    <img
                        src={colorMode === 'light' ? `/img/assistance-light.png` : `/img/assistance-dark.png`}
                        alt='assistant technique'
                    />
                </Fab>
            }
            <Slide
                direction="left"
                in={deviceSize === 2 ? showChatBox : true}
                mountOnEnter
                unmountOnExit
            >
                <section className='chat-tech-dep-box'>
                    <Box
                        component="div"
                        sx={{
                            backgroundColor: 'background.top',
                        }}
                        className="chat-tech-dep-box-top"
                        id="chat-tech-dep-box-top"
                    >
                        <h2>Service technique</h2>
                        {deviceSize === 2 &&
                            <IconButton
                                onClick={toggleShowChatBox}
                                color='error'
                            >
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        }
                    </Box>
                    <Box
                        component="section"
                        sx={{
                            backgroundColor: 'background.section'
                        }}
                        ref={chatBoxContentRef}
                        className="chat-tech-dep-box-content"
                    >
                        {
                            messageList && messageList.map((message, index) => (
                                index % 2 ?
                                    <UserMessage
                                        key={index}
                                        message={message}
                                        userAvatar={user.avatarUrl}
                                    /> :
                                    <TechMessage
                                        key={index}
                                        message={message}
                                    />
                            ))
                        }
                        {
                            resIsLoading && <LoaderMessage />
                        }
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            backgroundColor: 'background.top',
                        }}
                        className="chat-tech-dep-box-bottom"
                    >
                        <Formik
                            onSubmit={submit}
                            initialValues={{
                                message: ''
                            }}
                            validationSchema={settingsSchema}
                            validateOnBlur={true}
                            validateOnChange={true}
                        >
                            {({ handleSubmit, isValid, dirty }) => (
                                <Form
                                    onSubmit={handleSubmit}
                                    className="chat-tech-dep-box-bottom-form"
                                >
                                    <Field
                                        className="chat-tech-dep-box-bottom-form__input"
                                        id='chat-tech-dep-box-bottom-form__input'
                                        as={TextField}
                                        color='secondary'
                                        variant='standard'
                                        name={'message'}
                                        type={'text'}
                                        size="small"
                                        placeholder={'Votre message...'}
                                    />
                                    <Divider
                                        className="chat-tech-dep-box-bottom-form__divider"
                                        sx={{ height: 40 }}
                                        orientation="vertical"
                                    />

                                    <div>
                                        <IconButton
                                            type="submit"
                                            aria-label="Envoyer"
                                            disabled={!(isValid && dirty && !resIsLoading)}
                                            color='secondary'
                                        >
                                            <SendIcon />
                                        </IconButton>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </section>
            </Slide>
        </section >
    )
}


