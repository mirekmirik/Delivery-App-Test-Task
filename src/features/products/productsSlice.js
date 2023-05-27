import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"

export const getProducts = createAsyncThunk('shops/getProducts', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/products`)
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

export const getProductsByShop = createAsyncThunk('/shops/getProducts', async (id, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/shops/${id}/products`)
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
    products: [],
    isLoading: false,
    error: null
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.products = payload
            state.isLoading = false
            state.error = null
        })
        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        })

        builder.addCase(getProductsByShop.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getProductsByShop.fulfilled, (state, { payload }) => {
            state.products = payload
            state.isLoading = false
            state.error = null
        })
        builder.addCase(getProductsByShop.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        })
    }
})


export default productsSlice.reducer