import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { handleApiError } from "../utils/js/apiHelpers";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (_, { rejectWithValue }) => {
        try{
            const response = await Api().get("/order");
            console.log(response.data.orders);
            return response.data.orders;
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)

export const createOrders = createAsyncThunk(
    "order/createOrders",
    async (_, { rejectWithValue }) => {
        try{
            const response = await Api().post("/order");
            console.log(response.data.orders);
            return response.data.orders;
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)



export const editOrder = createAsyncThunk(
    "order/editOrder",
    async(orderId, {rejectWithValue}) => {
        try{
            const response = await Api().get(`/order/${orderId}`);
            console.log("Edit Response:", response.data);
            return orderId;
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)   

export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async(orderId, {rejectWithValue}) => {
        try{
            const response = await Api().patch(`/order/${orderId}`);
            console.log("Update Response:", response.data);
            return orderId;
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)

export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async(orderId, {rejectWithValue}) => {
        try{
            const response = await Api().delete(`/order/${orderId}`);
            console.log("Delete Response:", response.data);
            return orderId;
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error.response.data || "Something went wrong!")
        }
    }
)

