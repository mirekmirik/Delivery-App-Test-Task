import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"

export const getCoupons = createAsyncThunk('coupons/getCoupons', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/coupons`)
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
    coupons: [],
    findCoupon: '',
    isLoading: false,
    error: null
}

const couponsSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
        applyCoupon: (state, { payload }) => {
            if (state.findCoupon) {
                state.error = 'You have already applied coupon!'
                return;
            }

            const found = state.coupons.find(({ code }) => code === payload)
            if (found && !state.findCoupon) {
                state.findCoupon = found
            }
        },
        deleteCoupon: (state) => {
            state.findCoupon = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCoupons.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getCoupons.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.coupons = payload
            state.error = null
        })
        builder.addCase(getCoupons.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        })
    }
})

export const { applyCoupon, deleteCoupon } = couponsSlice.actions

export default couponsSlice.reducer
