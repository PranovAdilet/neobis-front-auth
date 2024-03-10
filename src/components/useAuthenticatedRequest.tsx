import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { useGetUserQuery, useRefreshTokenMutation } from '../api/api';
import { isAuthUser, saveUserData } from '../redux/reducers/user';
import {skipToken} from "@reduxjs/toolkit/query";


const useAuthenticatedRequest = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const { data, error, refetch, isLoading } = useGetUserQuery(accessToken && refreshToken ? accessToken : skipToken)
    const [mutate] = useRefreshTokenMutation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (error && 'status' in error && error.status === 401) {
                    await refreshTokenIfNeeded();
                }
                if (data) {
                    dispatch(isAuthUser(true));
                    dispatch(saveUserData(data));
                    navigate('/profile')
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error])

    const refreshTokenIfNeeded = async () => {
        const newToken = 'Bearer ' + refreshToken

        try {
            const tokenResponse = await mutate(newToken)

            if ('error' in tokenResponse && 'data' in tokenResponse.error) {
                const newAccessToken = `${tokenResponse.error.data}`;
                localStorage.setItem('accessToken', newAccessToken);
                await refetch();
            } else {
                console.error('Failed to refresh access token');
                throw new Error('Failed to refresh access token');
            }
        } catch (error) {
            console.error('Error refreshing tokens: ', error);
            throw error;
        }
    };

    return {
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken && !!refreshToken,
        isLoading,
        navigateToSignIn: () => navigate('/signIn')
    };
};

export default useAuthenticatedRequest;