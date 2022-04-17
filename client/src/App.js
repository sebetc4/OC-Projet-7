import "./styles/index.scss";
import React, { useEffect, useState } from "react";
import Routes from "./routes/routes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadedUser } from "./store/actions/user.actions";

const App = () => {

    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();

    const userIsLoaded = useSelector((state) => state.user.isLoaded)

    useEffect(() => {
        const checkToken = async () => {
            await axios.get('/api/auth/check-jswt')
                .then(res => {
                    setUser(res.data.user)
                    setIsLoaded(true)
                })
                .catch(() => {
                    console.log('Non connecté')
                })
        }
        checkToken()
    }, [])

    useEffect( () => {
        if (isLoaded) {
            user ? dispatch(getUser(user)) : dispatch(loadedUser())
        }
    }, [isLoaded, user, dispatch])

    return (
        <>
           { userIsLoaded ? <Routes /> : <p>Chargement...</p> }
        </>
    )
}
export default App;
