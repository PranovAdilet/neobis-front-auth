import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    ICheckPresenceData,
    ILoginField, ILoginUser,
    IShippingFields,

} from "../../interface/app.interface";


const API_URL = 'https://lorby-production.up.railway.app/v1/auth'

export const api = createApi({
    reducerPath: "api",
    tagTypes:['api'],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: API_URL,
            mode: 'cors'
        }),
    endpoints: (builder) => ({

        signUp: builder.mutation<string, IShippingFields>({
            query: (data) => {
                const {password, username, email} = data

                const newData = {
                    email,
                    username,
                    password,
                    endpoint: "http://localhost:3000/"
                }

                return {
                    url: '/registration',
                    method: 'POST',
                    body: newData,
                };
            }
        }),
        signIn: builder.mutation<ILoginUser, ILoginField>({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            })
        }),
        checkPresence :  builder.mutation<boolean, ICheckPresenceData>({
            query: (data) => {
                console.log(data)
                return {
                    url: '/check-presence',
                    method: 'POST',
                    body: data
                }
            }
        })

    })
})

export const {useSignUpMutation, useSignInMutation, useCheckPresenceMutation} = api
