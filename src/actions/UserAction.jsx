import { ToastContainer, toast } from "react-toastify";
import Api from "../utils/api";

export const getUserAction = async (dispatch, url = "/user") => {
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await Api().get(url);
        dispatch({
            type: "SET_USERS",
            payload: { data: res.data.user.data, next: res.data.user.next_page_url, prev: res.data.user.prev_page_url, },
        });
    } catch (error) {
        console.log([error.response?.status, error.message]);
        dispatch({ type: "SET_LOADING", payload: false });
    }
};

export const deleteUserAction = async (dispatch, id, getUser) => {
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await Api().delete(`/user/${id}`);
        res.data.message ? toast.success(res.data.message) : toast.error(res.data.error);
        getUser();
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
        dispatch({ type: "SET_LOADING", payload: false });
    }
};

export const changePasswordAction = async (dispatch,selectedUser,password,confirmPassword) => {
    const userId = selectedUser.id;
    try {
        const res = await Api().post(`/changePassword/${userId}`, { password, confirmPassword, });
        if (res.data.message) {
            toast.success(res.data.message);
            dispatch({ type: "TOGGLE_PASSWORD_MODAL", payload: { status: false, user: null }, });
            dispatch({ type: "RESET_PASSWORD_FIELDS" });
        } else {
            toast.error(res.data.error);
        }
    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Something went wrong!");
    }
};
