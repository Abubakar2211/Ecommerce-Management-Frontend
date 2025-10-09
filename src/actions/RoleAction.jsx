import { toast } from "react-toastify";
import Api from "../utils/api";

export const getRoleAction = async (dispatch) => {
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await Api().get('/role');
        dispatch({ type: "SET_ROLES", payload: { data: res.data.roles } });
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
        dispatch({ type: "SET_LOADING", payload: false })
    }
}

export const deleteRoleAction = async (dispatch, id, getRole) => {
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await Api().delete(`/role/${id}`);
        toast.success(res.data.message);
        getRole();
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
        dispatch({ type: "SET_LOADING", payload: false })
    }
}

export const createRoleAction = async (dispatch,name) => {
    try {
        const res = await Api().post('/role', { name });
        toast.success(res.data.message);
        dispatch({ type: "RESERT_FIELD" })
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
    }
}
export const updateRoleAction = async (dispatch,roleId,name) => {
    try {
        const res = await Api().patch(`/role/${roleId}`, { name });
        toast.success(res.data.message);
        dispatch({ type: "RESERT_FIELD" })
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
    }
}