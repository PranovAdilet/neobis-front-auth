import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    ICheckPresenceData,
    ILoginField, ILoginUser, IResetPassword,
    IShippingFields, IUser,

} from "../../interface/app.interface";

const token = localStorage.getItem('accessToken');

const headers = {
    Authorization: 'Bearer' + token
}

const API_URL = 'https://lorby-production.up.railway.app/v1'

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
                    url: '/auth/registration',
                    method: 'POST',
                    body: newData,
                };
            }
        }),
        signIn: builder.mutation<ILoginUser, ILoginField>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        checkPresence : builder.mutation<boolean, ICheckPresenceData>({
            query: (data) => {
                return {
                    url: '/auth/check-presence',
                    method: 'POST',
                    body: data
                }
            }
        }),
        resendConfirmation :  builder.mutation<string, ICheckPresenceData>({
            query: (data) => {
                return {
                    url: '/auth/resend-confirmation',
                    method: 'POST',
                    body: data
                }
            }
        }),
        confirmation: builder.mutation<string, string>({
            query: (token) => {
                return {
                    url: `/auth/confirmation?ct=${token}`,
                    method: "PUT"
                }
            }
        }),
        forgotPassword: builder.mutation<string, ICheckPresenceData>({
            query: (data) => {

                return {
                    url: '/auth/forgot-password',
                    method: "POST",
                    body: data
                }
            }
        }),
        resetPassword: builder.mutation<string, IResetPassword>({

            query: (data) => {

                return {
                    url: `/auth/reset-password?rpt=${data.rpt}`,
                    method: "PUT",
                    body: {
                        password: data.password
                    }
                }
            }
        }),

        getUser: builder.query<string, IUser>({
            query: () => {
                return {
                    url: `/users`,
                    headers: headers,
                    method: "GET"
                }
            }
        })

    })
})

export const {useSignUpMutation, useResetPasswordMutation,
    useForgotPasswordMutation, useGetUserQuery,
    useSignInMutation, useCheckPresenceMutation,
    useConfirmationMutation, useResendConfirmationMutation} = api

