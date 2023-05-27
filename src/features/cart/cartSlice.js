import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],
    isLoading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // AddItemToCart - Add And Remove Logic
        addItemToCart: (state, { payload }) => {
            const found = state.items.findIndex(({ _id }) => _id === payload._id)
            if (found < 0) {
                state.items.push({ ...payload, quantity: 1 })
                localStorage.setItem('cart', JSON.stringify(state.items));
            } else {
                state.items[found] = { ...state.items[found], quantity: payload.quantity || state.items[found].quantity + 1 }
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        deleteItemFromCart: (state, { payload }) => {
            const found = state.items.findIndex(({ _id }) => _id === payload)
            if (found >= 0) {
                state.items.splice(found, 1)
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        getCartDataFromLocalStorage: (state) => {
            const cartData = localStorage.getItem('cart');
            if(cartData) {
                state.items = JSON.parse(cartData)
            }
        }
    }
})


export const { addItemToCart, deleteItemFromCart, getCartDataFromLocalStorage } = cartSlice.actions
export default cartSlice.reducer