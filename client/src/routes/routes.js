import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Home, Login } from "../pages";

export default function routes() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isLoggin = useSelector((state) => state.user.isLoggin)

    return (
        <Router>
            <Routes>
                { !isLoggin ?
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

