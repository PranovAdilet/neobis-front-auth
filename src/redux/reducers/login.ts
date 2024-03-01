import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


interface CounterState {
    user: null,
    status: "empty" | "loading" | "rejected" | "resolve"
    error: string
}

const initialState: CounterState = {
    user: null,
    status: "empty",
    error: ""
}

export const counterSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
})

export const {} = counterSlice.actions


export default counterSlice.reducer