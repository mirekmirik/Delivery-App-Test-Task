import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"

export const getShops = createAsyncThunk('shops/getShops', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/shops`)
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }
        const data = await res.json()
        return data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})


const initialState = {
    list: [],
    isLoading: false,
    error: null
}


const shopSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getShops.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getShops.fulfilled, (state, { payload }) => {
            state.list = payload
            state.isLoading = false
            state.error = null
        })
        builder.addCase(getShops.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        })
    }
})


export default shopSlice.reducer