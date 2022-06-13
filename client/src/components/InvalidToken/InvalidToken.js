import React, { useState, useEffect, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, LinearProgress, Slide, useMediaQuery } from '@mui/material';
import { logoutUser } from '../../store/actions/user.actions';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvalidToken() {

    // Hooks
    const dispatch = useDispatch()
    const fullScreen = useMediaQuery('(max-width:768px)');

    // Store
    const invalidToken = useSelector(state => state.errors.invalidToken)

    // State 
    const [invalidTokenTimer, setInvalidTokenTimer] = useState(0)

    useEffect(() => {
        const timer = invalidToken && setInterval(() => {
            setInvalidTokenTimer(prev => prev + 1)
        }, 100)
        return () => clearTimeout(timer)
    }, [invalidToken])

    useEffect(() => {
        if (invalidTokenTimer === 100) {
            dispatch((logoutUser()))
            setInvalidTokenTimer(0)
        }
    }, [invalidTokenTimer, dispatch])

    return (
        <Dialog
            open={invalidToken}
            TransitionComponent={Transition}
            fullScreen={fullScreen}
            keepMounted
            maxWidth={'xl'}
            scroll={'body'}
        >
            <div className='invalid-token-modal'>
                <h2>Session expirée</h2>
                <p>Vous allez être redirigé vers la page de connexion.</p>
                <div className='invalid-token-modal__linear-progress-container'>
                    <LinearProgress
                        variant="determinate"
                        value={invalidTokenTimer}
                    />
                </div>
            </div>
        </ Dialog>

    )
}
