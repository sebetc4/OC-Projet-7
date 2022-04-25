import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Feed, Header, Home, Login, Profile, Settings } from '../features'


export default function Index() {

    const userIsLogged = useSelector((state) => state.user.isLogged)
    const menuOpen = useSelector((state) => state.device.displayMobilMenu)

   
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
                    <main className={`main ${menuOpen && 'main--active-menu'}`}>
                        <Routes>
                            <Route path='/home' element={<Home />} />
                            <Route path='/feeds' element={<Feed />} />
                            <Route path='/profile' >
                                <Route path=':userId' element={<Profile />} />
                            </Route>
                            <Route path='/settings' element={<Settings />} />
                            <Route path='*' element={<Navigate to={`/home`} replace />} />
                        </Routes>
                    </main>
                </>
            }
        </Router>
    );
}

