import {isAuthUser, saveUserData} from "../redux/reducers/user";
import {NavigateFunction} from "react-router-dom";
import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition, QueryActionCreatorResult, QueryDefinition
} from "@reduxjs/toolkit/query";
import {IError, IUser} from "../interface/app.interface";

interface IProps{
    navigate: NavigateFunction
    dispatch: Function,
    mutate: MutationTrigger<MutationDefinition<string, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "api", IError, "api">>
    refetch: () => QueryActionCreatorResult<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "api", IUser, "api">>
}


export const checkTokens = ({navigate, dispatch, mutate, refetch} : IProps) => {


    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')


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

                        } catch (error){
                            console.log(`Ошибка: ${error}`)
                        }

                    }
                }
            }

        }).catch(error => {
            console.log(`Ошибка: ${error}`)
        })
    }else {
        navigate('/signIn')
    }
}