import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
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
                console.log(data)
                const {password, username, email} = data

                const newData = {
                    password,
                    username,
                    email,
                    endpoint: "\\http://localhost:3000/confirmation?ct=\\"
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
        })

    })
})

export const {useSignUpMutation, useSignInMutation} = api
