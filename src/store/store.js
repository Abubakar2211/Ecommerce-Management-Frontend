import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';
import productSlice from './slices/productSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        order: orderSlice,
        product: productSlice,
    }
})