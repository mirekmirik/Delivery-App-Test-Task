import { configureStore } from "@reduxjs/toolkit";
import shopsSlice from "./shops/shopsSlice";
import productsSlice from "./products/productsSlice";
import cartSlice from "./cart/cartSlice";
import ordersSlice from "./orders/ordersSlice";
import couponsSlice from "./coupons/couponsSlice";

export const store = configureStore({
    reducer: {
        shops: shopsSlice,
        products: productsSlice,
        cart: cartSlice,
        orders: ordersSlice,
        coupons: couponsSlice
    }
})