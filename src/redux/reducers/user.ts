import {createSlice} from '@reduxjs/toolkit'
import {ICheckPresenceData} from "../../interface/app.interface";
import {RootState} from "../store";


interface userState {
    user: ICheckPresenceData | null,
    status: "empty" | "loading" | "rejected" | "resolve"
    error: string
    isAuth: boolean
}

const initialState: userState = {
    user: null,
    status: "empty",
    error: "",
    isAuth: false
}



export const userSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            state.user = {
                ...action.payload,
                endpoint: 'http://localhost:3000/'
            }
        },
        isAuthUser: (state, action) => {
            state.isAuth = action.payload
        }
    },
})

export const {saveUserData, isAuthUser} = userSlice.actions


export default userSlice.reducer

export const selectUser = (state : RootState) => state.userSlice