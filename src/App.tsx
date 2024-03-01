import React from 'react';
import Login from "./pages/Login/Login";
import {Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Verification from "./components/Verification";



function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/signUp" element={<Registration/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/verification" element={<Verification/>}/>
        </Routes>
    </div>
  );
}

export default App;
