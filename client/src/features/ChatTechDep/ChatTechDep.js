import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux'


import { Divider, TextField, Slide, IconButton, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { LoaderMessage, TechMessage, UserMessage } from './components';

export default function ChatTechDep() {

    // Store
    const user = useSelector((state) => state.user.data)
    const deviceSize = useSelector(state => state.app.deviceSize)

    const chatBoxContentRef = useRef()

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

    useEffect(() => {
        chatBoxContentRef.current && chatBoxContentRef.current.scrollTo({ top: chatBoxContentRef.current.scrollHeight, behavior: "smooth" })
    }, [messageList, resIsLoading])

    useEffect(() => {
        const fetchResponse = async () => {
            setResIsLoading(true)
            const message = `${sendMessage}Human:${userMessage}\nAI:`
            const res = await axios.post(`/api/chat-ai/`, { message })
            setSendMessage(sendMessage + message + res.data + '\n')
            setResIsLoading(false)
            addMessageToList(res.data)
        }
        if (userMessage) fetchResponse()
    }, [userMessage])

    useEffect(() => {

    })

    const addMessageToList = async (message) => {
        message.replace('Human:', '').replace('AI:', '').replace('\n', '')
        setMessageList([...messageList, message])
    }

    const submit = (values, actions) => {
        const mess = values.message
        values.message = ''
        setMessageList([...messageList, mess])
        setUserMessage(mess)
    };

    const toggleShowChatBox = () => setShowChatBox(!showChatBox)

    return (
        <div className='chat-tech-dep'>
            <>{
                deviceSize === 2 &&
                <Fab
                    className='chat-tech-dep-button'
                    color="primary"
                    aria-label="add"
                    onClick={toggleShowChatBox}
                >
                    <img
                        src={`/img/assistance.png`}
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
                    <div className='chat-tech-dep-box'>
                        <div
                            className="chat-tech-dep-box-header"
                            id="chat-tech-dep-box-header"
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
                        </div>
                        <div
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
                        </div>
                        <div className="chat-tech-dep-box-bottom">
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
                                            as={TextField}
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
                                                aria-label="envoyer"
                                                disabled={!(isValid && dirty && !resIsLoading)}
                                                color='primary'
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Slide>
            </>
        </div>


    )
}


