import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { handleApiError } from "../utils/js/apiHelpers";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (_, { rejectWithValue }) => {
        try{
            const response = await Api().get("/orders");
            return response.data;
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)