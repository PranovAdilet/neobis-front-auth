import {createSlice} from '@reduxjs/toolkit'
import {ICheckPresenceData} from "../../interface/app.interface";
import {RootState} from "../store";


interface userState {
    user: ICheckPresenceData | null,
    status: "empty" | "loading" | "rejected" | "resolve"
    error: string
}

const initialState: userState = {
    user: null,
    status: "empty",
    error: ""
}

export const userSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            if (state.user){
                state.user.username = action.payload.username
                state.user.email = action.payload.email
                state.user.endpoint = 'http://localhost:3000/'

            }
        }
    },
})

export const {saveUserData} = userSlice.actions


export default userSlice.reducer

export const selectUser = (state : RootState) => state.userSlice