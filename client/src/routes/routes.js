import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

import { Feed, Header, Home, Login, Profile, Settings, Search, ChatTechDep, Chat } from '../features'
import { Errors } from "../components";


export default function Index() {

    // Store
    const userIsLogged = useSelector((state) => state.user.isLogged)
    const app = useSelector((state) => state.app)


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
                    <main className={`main ${app.displayMobileMenu ? 'main--active-menu' : ''}`}>
                        <Routes>
                            <Route path='/search' >
                                <Route path=':query' element={<Search />} />
                            </Route>
                            <Route path='/home' element={<Home />} />
                            <Route path='/feeds' element={<Feed />} />
                            <Route path='/profile' >
                                <Route path=':userId' element={<Profile />} />
                            </Route>
                            <Route path='/settings' element={<Settings />} />
                            <Route path='/chat' element={<Chat />} />
                            {
                                app.deviceSize !== 2 && <Route path='/chat-tech-dep' element={<ChatTechDep />} />
                            }
                            <Route path='*' element={<Navigate to={`/home`} replace />} />
                        </Routes>
                        {app.deviceSize === 2 &&
                            <ChatTechDep />
                        }
                        <Errors />
                    </main>
                </>
            }
        </Router>
    );
}

