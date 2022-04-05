import "./styles/index.scss";
import React, { useEffect, useState } from "react";
import { userIdContext } from "./components/AppContext";
import Routes from "./routes";
import axios from "axios";

function App() {
    const [userId, setUserId] = useState();

    useEffect(() => {
        axios
            .get("api/auth/checkjswt")
            .then((res) => {
                setUserId(res.data.userId);
            })
            .catch((err) => console.log(err));
    });
    return (
        <userIdContext.Provider value={userId}>
            <Routes />
        </userIdContext.Provider>
    );
}

export default App;
