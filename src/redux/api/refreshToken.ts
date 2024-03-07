import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const getToken = createAsyncThunk(
    '/user/getToken',
    async () => {
        const response = await axios('https://lorby-production.up.railway.app/v1/users')

        return response.data

    }

)