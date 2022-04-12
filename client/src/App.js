import "./styles/index.scss";
import React, { useEffect, useState } from "react";
import Routes from "./routes/routes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadedUser } from "./store/actions/user.actions";

const App = () => {

    const [userId, setUserId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const userIsLoaded = useSelector((state) => state.user.isLoaded)


    useEffect(() => {
        const checkToken = async () => {
            await axios.get('/api/auth/check-jswt')
                .then(res => {
                    setUserId(res.data.userId)
                    setIsLoaded(true)
                })
                .catch(() => {
                    console.log('Non connecté')
                })
        }
        if (isLoaded) userId ? dispatch(getUser(userId)) : dispatch(loadedUser())
        checkToken()
    }, [isLoaded, userId, dispatch])

    return (
        <>
           { userIsLoaded ? <Routes userId={userId} /> : <p>Chargement...</p> }
        </>
    )
}
export default App;
