import "./styles/index.scss";
import React, { useEffect, useState } from "react";
import Routes from "./routes/routes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadedUser } from "./store/actions/user.actions";
import { getAllUsers } from "./store/actions/users.actions";
import { getDeviceSize } from "./store/actions/device.actions";

const App = () => {

    // Hooks
    const dispatch = useDispatch();

    // State
    const [user, setUser] = useState(null)
    const [jswtIsCheck, setJswtIsCheck] = useState(false)

    // Store
    const userIsLoaded = useSelector((state) => state.user.isLoaded)

    // DOM
    window.addEventListener('resize', handleResize)

    let deviceSize = 0
    // Set device size in the store
    function handleResize() {
        if (window.innerWidth < 768 && deviceSize !== 0) {
            deviceSize = 0
            dispatch(getDeviceSize(0))
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024 && deviceSize !== 1) {
            deviceSize = 1
            dispatch(getDeviceSize(1))
        } else if (window.innerWidth >= 1024 && deviceSize !== 2) {
            deviceSize = 2
            dispatch(getDeviceSize(2))
        }
    }

    // Check Jswt
    useEffect(() => {
        handleResize()
        const checkToken = async () => {
            try {
                const resJswt = await axios.get('/api/auth/check-jswt')
                setUser(resJswt.data.user)
                setJswtIsCheck(true)
            } catch (err) {
                console.log('Non connecté')
            }
        }
        checkToken()
    }, [])

    // Load User
    useEffect(() => {
        if (jswtIsCheck) 
            user ? dispatch(getUser(user)) : dispatch(loadedUser())
    }, [jswtIsCheck, user, dispatch])

    return (
        <>
            {userIsLoaded ? <Routes /> : <p>Chargement...</p>}
        </>
    )
}
export default App;
