import React from 'react';
import Login from "./pages/Login/Login";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Confirmation from "./components/Verification/Confirmation";
import Success from "./components/Logged/Logged";
import {useAppSelector} from "./redux/hooks/reduxHooks";
import {selectUser} from "./redux/reducers/user";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
import useAuthenticatedRequest from "./components/useAuthenticatedRequest";
import NotFound from "./pages/NotFound/NotFound";



function App() {

    const {isAuth} = useAppSelector(selectUser)

    const { accessToken, isAuthenticated, navigateToSignIn, isLoading } = useAuthenticatedRequest()

    if (isLoading) return <div className="loader"></div>

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/profile"
                    element={isAuthenticated ? <Success /> : <NotFound/>}
                />
                <Route path="/signUp" element={<Registration/>}/>
                <Route path="/signIn" element={<Login/>}/>
                <Route path="/confirmation" element={<Confirmation/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="*" element={<div>404... not found </div>} />
            </Routes>
        </div>
    );
}

export default App;
