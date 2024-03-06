import React from 'react';
import Login from "./pages/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Confirmation from "./components/Verification/Confirmation";
import Success from "./components/Logged/Logged";
import Main from "./pages/Main/Main";
import {useAppSelector} from "./redux/hooks/reduxHooks";
import {selectUser} from "./redux/reducers/user";
import ResetPassword from "./pages/ResetPassword/ResetPassword";



function App() {

    const {isAuth} = useAppSelector(selectUser)

    return (
        <div className="App">
            <Routes>
                {
                    isAuth ? <>
                        <Route path="/profile" element={<Success/>}/>
                        <Route path="*" element={<Navigate to="/" />}/>
                    </> : <>
                        <Route path="/signUp" element={<Registration/>}/>
                        <Route path="/signIn" element={<Login/>}/>
                        <Route path="/confirmation" element={<Confirmation/>}/>
                        <Route path="/reset-password" element={<ResetPassword/>}/>
                        <Route path="*" element={<Navigate to="/signIn" />}/>
                    </>
                }
                <Route path="/" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default App;
