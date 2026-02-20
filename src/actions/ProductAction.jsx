import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { handleApiError, handleApiResponse } from "../utils/js/apiHelpers";

export const fetchProduct = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api().get("/product");
            console.log(response);
            return response.data;
            
        } catch (error) {
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)
export const createProduct = createAsyncThunk(
    "products/createProducts",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await Api().post("/product",formData);
            console.log(res);
            handleApiResponse(res)
            return res.data;
        } catch (error) {
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)