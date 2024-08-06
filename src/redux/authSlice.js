import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    msg: "",
    user: "",
    token: "",
    loading: false,
    error: ""
}
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})

export default authSlice.extraReducers