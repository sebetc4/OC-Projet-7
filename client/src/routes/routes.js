import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home, Login } from "../pages";

export default function routes(props) {

    return (
        <Router>
            <Routes>
                {!props.user ?
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path='*' element={<Navigate to='/login' replace />} />
                    </>
                    :
                    <>
                        <Route path='home' element={<Home />} />
                        <Route path='*' element={<Navigate to='/home' replace />} />
                    </>
                }
            </Routes>
        </Router>
    );
}

