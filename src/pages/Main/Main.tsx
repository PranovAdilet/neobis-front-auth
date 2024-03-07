import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useGetUserQuery, useRefreshTokenMutation} from "../../redux/api/api";
import {useAppDispatch} from "../../redux/hooks/reduxHooks";
import {isAuthUser, saveUserData} from "../../redux/reducers/user";


const Main = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const { refetch, isLoading} = useGetUserQuery()


    const [mutate] = useRefreshTokenMutation()


    useEffect(() => {
       if (accessToken && refreshToken){

           refetch().then(async (res) => {

               if (res.data){
                   const newData = {
                       username: res.data.username,
                       email: res.data.email
                   }

                   dispatch(isAuthUser(true))
                   dispatch(saveUserData(newData))

                   navigate('/profile')

               }else if (res.error){


                   const newToken = 'Bearer ' + refreshToken

                   const tokenResponse = await mutate(newToken)

                   if ('error' in tokenResponse){
                       if ('data' in tokenResponse['error']){
                           localStorage.setItem('accessToken', `${tokenResponse.error.data}`)

                           const response = await refetch()

                           try {
                               if (response.data){
                                   const newData = {
                                       username: response.data.username,
                                       email: response.data.email
                                   }

                                   dispatch(isAuthUser(true))
                                   dispatch(saveUserData(newData))
                                   navigate('/profile')
                               }

                           } catch (e){
                               console.log(`Ошибка: ${e}`)
                           }

                       }
                   }
               }

           }).catch(e => {
               console.log(`Ошибка: ${e}`)
           })
       }else {
           navigate('/signIn')
       }
        // eslint-disable-next-line
    }, [])

    if (isLoading) return (
        <div>'...Loading'</div>
    )


    return (
        <div>

        </div>
    );
};

export default Main;