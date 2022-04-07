import "./styles/index.scss";
import React, { useEffect, useState } from "react";
import Routes from "./routes/routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./store/actions/user.actions";

const App = () => {

    const [userId, setUserId] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/auth/checkJwt')
            .then(res => setUserId(res.data.userId))
            .catch(() => console.log('Utilisateur non connecté'))
    }, [])

    useEffect(() => {
        if (userId)
            dispatch(getUser(userId))
    }, [userId])


    return (
        <Routes userId={userId} />
    )
}


export default App;
