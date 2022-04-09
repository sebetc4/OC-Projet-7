import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Home, Login, Profil, Settings } from "../pages";
import { Header } from '../components'

export default function routes() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userIsLogged = useSelector((state) => state.user.isLogged)

    return (
        <Router>
            {!userIsLogged ?
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path='*' element={<Navigate to='/login' replace />} />
                </Routes>
                :
                <>
                    <Header />
                    <main className="main">
                        <Routes>
                            <Route path='/home' element={<Home />} />
                            <Route path='/profil' element={<Profil />} />
                            <Route path='/settings' element={<Settings />} />
                            <Route path='*' element={<Navigate to='/profil' replace />} />
                        </Routes>
                    </main>
                </>
            }
        </Router>
    );
}

