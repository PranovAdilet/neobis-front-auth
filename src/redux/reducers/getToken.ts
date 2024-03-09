import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {IUser} from "../../interface/app.interface";
import {RootState} from "../store";

export const getToken2 = async () => {

    const token = localStorage.getItem('accessToken')

    const headers = {
        Authorization: 'Bearer ' + token,
        ContentType: 'application/json'
    }

    try {
        const response = await fetch('https://lorby-production.up.railway.app/v1/users', {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Failed to refresh tokens');
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        throw error
    }
}




export const getToken = createAsyncThunk(
    'token/getToken',
    async () => {

        const token = localStorage.getItem('accessToken')

        const headers = {
            Authorization: 'Bearer ' + token,
            ContentType: 'application/json'
        }

        try {
            const response = await fetch('https://lorby-production.up.railway.app/v1/users', {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to refresh tokens');
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Error refreshing tokens:', error);
            throw error
        }
    }
)

interface tokenState {
    user: IUser | null,
    status: "empty" | "loading" | "rejected" | "resolve"
    error: string
}

const initialState: tokenState = {
    user: null,
    status: "empty",
    error: "",
}

export const tokenSLice = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getToken.pending, (state, action) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(getToken.fulfilled, (state, action) => {
                state.status = 'resolve';
                state.user = action.payload;
            })
            .addCase(getToken.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string
            });
    }
})



export default tokenSLice.reducer

export const selectToken = (state : RootState) => state.tokenSlice