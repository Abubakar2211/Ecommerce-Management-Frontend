import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: [],
    nextPage: null,
    prevPage: null,
    passwordChange: false,
    assignRole: false,
    assignPermission: false,
    selectedUser: null,
    password: "",
    confirmPassword: "",
    loading: true,
    userId: "",
    name: "",
    email: "",
    roles: [],
    permissions:[],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.user = action.payload.data,
            state.nextPage = action.payload.next,
            state.prevPage = action.payload.prev,
            state.loading = false
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        togglePasswordModal: (state, action) => {
            state.passwordChange = action.payload.status;
            state.selectedUser = action.payload.user;
        },
        toggleAssignRoleModal: (state, action) => {
            state.assignRole = action.payload.status;
            state.selectedUser = action.payload.user;
        },
        toggleAssignPermissionModal: (state, action) => {
            state.assignPermission = action.payload.status;
            state.selectedUser = action.payload.user;
        },
        setFields: (state, action) => {
            Object.assign(state, action.payload);
        },
        resetFields: (state, action) => {
            action.payload.forEach((field) => {
                state[field] = "";
            });
        },
        setRoles: (state, action) => {
            state.roles = action.payload.data;
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload.data;
        },
    }
});

export const {
    setUsers,setLoading,togglePasswordModal,toggleAssignRoleModal,
    toggleAssignPermissionModal,setField,setFields,resetFields,setRoles,setPermissions
} = userSlice.actions;

export default userSlice.reducer;