import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Main = () => {

    const navigate = useNavigate()

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')


    useEffect(() => {
        if (accessToken){
            navigate('/profile')
        }else if(refreshToken){
            console.log(refreshToken)
        }else {
            navigate('/signIn')
        }
    }, [accessToken, refreshToken, navigate])

    return (
        <div>

        </div>
    );
};

export default Main;