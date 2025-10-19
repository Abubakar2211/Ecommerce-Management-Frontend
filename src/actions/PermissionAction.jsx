import { toast } from "react-toastify";
import Api from "../utils/api";

export const getPermissionAction = async (dispatch) => {
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await Api().get('/permission');
        dispatch({ type: "SET_PERMISSIONS", payload: { data: res.data.permissions } });
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
        dispatch({ type: "SET_LOADING", payload: false })
    }
}

export const deletePermissionAction = async (dispatch, id, getPermission) => {
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await Api().delete(`/permission/${id}`);
        toast.success(res.data.message);
        getPermission();
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
        dispatch({ type: "SET_LOADING", payload: false })
    }
}

export const createPermissionAction = async (dispatch,name) => {
    try {
        const res = await Api().post('/permission', { name });
        toast.success(res.data.message);
        dispatch({ type: "RESET_FIELD" })
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
    }
}
export const updatePermissionAction = async (dispatch,permissionId,name) => {
    try {
        const res = await Api().patch(`/permission/${permissionId}`, { name });
        toast.success(res.data.message);
        dispatch({ type: "RESET_FIELD" })
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
    }
}