import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { handleApiError } from "../utils/js/apiHelpers";

export const fetchProduct = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api().get("/product");
            console.log(response.data);
            return response.data;
        } catch (error) {
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)