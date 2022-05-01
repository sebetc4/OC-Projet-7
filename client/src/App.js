import "./styles/index.scss";
import React, { useEffect } from "react";
import Routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/actions/user.actions";
import { setDeviceSize } from "./store/actions/app.actions";

const App = () => {

    // Hooks
    const dispatch = useDispatch();

    // Store
    const userIsLoaded = useSelector((state) => state.user.isLoaded)
    const deviceSize = useSelector((state) => state.app.deviceSize)

    // Set device size in the store
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768 && deviceSize !== 0) {
                dispatch(setDeviceSize(0))
            } else if (window.innerWidth >= 768 && window.innerWidth < 1024 && deviceSize !== 1) {
                dispatch(setDeviceSize(1))
            } else if (window.innerWidth >= 1024 && deviceSize !== 2) {
                dispatch(setDeviceSize(2))
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return window.removeEventListener('resize', handleResize)
    }, [])

    // Check Auth
    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <>
            {userIsLoaded ? <Routes /> : <p>Chargement...</p>}
        </>
    )
}
export default App;
