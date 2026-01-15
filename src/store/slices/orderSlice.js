import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    order : [],
    loading: true,

};
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        getOrder: () => {
            
        }
    }
});

export default orderSlice.reducer;
