import React from 'react';
import Login from "./pages/Login/Login";
import {Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Verification from "./components/Verification/Verification";
import Success from "./components/Logged/Logged";



function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/signUp" element={<Registration/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/confirmation" element={<Verification/>}/>
            <Route path="/profile" element={<Success/>}/>
        </Routes>
    </div>
  );
}

export default App;
