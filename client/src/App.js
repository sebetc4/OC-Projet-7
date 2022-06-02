import "./styles/index.scss";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Routes from "./routes/routes";
import { fetchUserData } from "./store/actions/user.actions";
import { setDeviceSize, setDisplayMobileMenu } from "./store/actions/app.actions";
import { Loader } from "./components";



export default function App() {

    // Hooks
    const dispatch = useDispatch();

    // Store
    const userIsLoaded = useSelector(state => state.user.isLoaded)
    const deviceSize = useSelector(state => state.app.deviceSize)

    // Check auth
    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
    
    // Set device size in the store
    useLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 769 && deviceSize !== 0) {
                dispatch(setDeviceSize(0))
            } else if (window.innerWidth >= 769 && window.innerWidth < 1025 && deviceSize !== 1) {
                dispatch(setDeviceSize(1))
            } else if (window.innerWidth >= 1025 && deviceSize !== 2) {
                dispatch(setDeviceSize(2))
                dispatch(setDisplayMobileMenu(false))
            }
        }
        handleResize()
        window.removeEventListener('resize', handleResize)
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [deviceSize, dispatch])

    return (
        <>
            {userIsLoaded ?
                <Routes />
                :
                <Loader />
            }
        </>
    )
}
