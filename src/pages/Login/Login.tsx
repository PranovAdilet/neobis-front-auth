import React, {useEffect, useState} from 'react';
import image from "../../assets/images/login.png"
import LoginForm from "../../components/Form/LoginForm/LoginForm";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks/reduxHooks";
import {useRefreshTokenMutation} from "../../api/api";
import {isAuthUser, saveUserData} from "../../redux/reducers/user";
import {getToken2} from "../../redux/reducers/getToken";


const Login = () => {

    const [forgotPasswordState, setForgotPasswordState] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')


    const [mutate] = useRefreshTokenMutation()

    const getAccessToken = async () => {

        const newToken = 'Bearer ' + refreshToken

        try {
            const tokenResponse = await mutate(newToken)

            if ('error' in tokenResponse){
                if ('data' in tokenResponse['error']){

                    localStorage.setItem('accessToken', `${tokenResponse.error.data}`)

                   try {
                       const response = await getToken2()

                       if (response){
                           const newData = {
                               username: response.username,
                               email: response.email
                           }

                           dispatch(isAuthUser(true))
                           dispatch(saveUserData(newData))
                           navigate('/profile')
                       }
                   }catch (error){
                       console.error('Error refreshing tokens:', error);
                       throw error
                   }


                }
            }
        }catch (error){
            console.error('Error refreshing tokens:', error);
            throw error
        }
    }


    useEffect(() => {
        const checkTokens = () => {
            if (accessToken && refreshToken){

                getToken2().then(async (response) => {

                    if (response){
                        const newData = {
                            username: response.username,
                            email: response.email
                        }

                        dispatch(isAuthUser(true))
                        dispatch(saveUserData(newData))

                        navigate('/profile')
                    } //else if (response.error){ rtk-query
                    //     getAccessToken()
                    // }

                }).catch(error => {
                    getAccessToken() //createAsyncThunk
                    console.log(`Ошибка: ${error}`)
                })
            }else {
                navigate('/signIn')
            }
        }
        checkTokens()
        // eslint-disable-next-line
    }, [])


    return (
        <section className="login">
            <div className="login__content">
                <div className="login__left">
                    <img className="login__left-img" src={image} alt=""/>
                    <div className="login__left-info">

                        <h2 className="login__left-title">Lorby</h2>
                        <p className="login__left-text">Твой личный репетитор</p>
                    </div>
                </div>
                {
                    !forgotPasswordState ? <LoginForm setForgotPassword={setForgotPasswordState}/> : <ForgotPassword setForgotPassword={setForgotPasswordState}/>
                }
            </div>
        </section>
    );
};

export default Login;