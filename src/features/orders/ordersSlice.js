import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";


export const createOrder = createAsyncThunk('orders/createOrder', async (order, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/orders/createOrder`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
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


export const getOrdersByUser = createAsyncThunk('orders/getOrdersByUser', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/orders/getOrders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

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
    orders: [],
    historyOrders: [],
    isLoading: false,
    error: null,
    success: null
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, { payload }) => {
            state.orders.push(payload)
        },
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.orders.push(payload)
            state.error = null
            state.success = `Order has been successfully ordered! Expect for a call..`
        })
        builder.addCase(createOrder.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
            state.success = false
        })


        builder.addCase(getOrdersByUser.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getOrdersByUser.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.historyOrders = payload
            state.error = null
        })
        builder.addCase(getOrdersByUser.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        })
    }
})

export const { resetError } = ordersSlice.actions


export default ordersSlice.reducer
