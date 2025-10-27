import { toast } from "react-toastify";
import Api from "../utils/api";
import { resetFields, setLoading, setPermissions, setRoles, setUsers, togglePasswordModal } from "../store/slices/userSlice";
import { handleApiError, handleApiResponse } from "../utils/js/apiHelpers";

export const getUserAction = async (dispatch, url = "/user") => {
    try {
        dispatch(setLoading(true));
        const res = await Api().get(url);
        dispatch(
            setUsers({
                data: res.data.user.data, next: res.data.user.next_page_url, prev: res.data.user.prev_page_url
            })
        );
    } catch (err) {
        handleApiError(err);
        dispatch(setLoading(false));
    }
};

export const deleteUserAction = async (dispatch, id, getUser) => {
    try {
        dispatch(setLoading(true));
        const res = await Api().delete(`/user/${id}`);
        handleApiResponse(res);
        getUser();
    } catch (err) {
        handleApiError(err);
        dispatch(setLoading(false));
    }
};

export const changePasswordAction = async (dispatch, selectedUser, password, confirmPassword) => {
    const userId = selectedUser.id;
    try {
        const res = await Api().post(`/changePassword/${userId}`, { password, confirmPassword, });
        if (res) {
            handleApiResponse(res)
            dispatch(togglePasswordModal({ status: false, user: null }))
            dispatch(resetFields(["password", "confirmPassword"]))
        } else {
            toast.error(res.data.error);
        }
    } catch (err) {
        handleApiError(err);
    }
};

export const createdUserAction = async (dispatch, name, email, password, confirmPassword) => {
    try {
        const res = await Api().post('/user', { name, email, password, password_confirmation: confirmPassword });
        handleApiResponse(res);
        dispatch(resetFields(["name", "email", "password", "confirmPassword"]));
    } catch (err) {
        handleApiError(err);
    }
}

export const updatedUserAction = async (userId, name, email) => {
    try {
        const res = await Api().patch(`/user/${userId}`, { name, email });
        handleApiResponse(res);
    } catch (err) {
        handleApiError(err);
    }
}

export const getRoles = async (dispatch) => {
    try {
        const roles = await Api().get('/role');
        dispatch(setRoles({ data: roles.data.roles }));
    } catch (err) {
        handleApiError(err);
    }
}

export const getPermissions = async (dispatch) => {
    try {
        const permissions = await Api().get('/permission');
        dispatch(setPermissions({ data: permissions.data.permissions }));
    } catch (err) {
        handleApiError(err);
    }
}