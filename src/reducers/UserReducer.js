export const initialState = {
    user: [],
    nextPage: null,
    prevPage: null,
    passwordChange: false,
    assignRole : false,
    assignPermission : false,
    selectedUser: null,
    password: "",
    confirmPassword: "",
    loading: true,
    userId: "",
    name: "",
    email: "",
    roles : []
};

export function userReducer(state, action) {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, user: action.payload.data, nextPage: action.payload.next, prevPage: action.payload.prev, loading: false, };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "TOGGLE_PASSWORD_MODAL":
            return { ...state, passwordChange: action.payload.status, selectedUser: action.payload.user, };
        case "TOGGLE_ASSIGNROLE_MODAL":
            return { ...state, assignRole: action.payload.status, selectedUser: action.payload.user, };
        case "TOGGLE_ASSIGNPERMISSION_MODAL":
            return { ...state, assignPermission: action.payload.status, selectedUser: action.payload.user, };
        case "SET_FIELD":
            return { ...state, [action.field]: action.payload };
        case "SET_FIELDS":
            return { ...state, ...action.payload };
        case "RESET_FIELDS": {
            const newState = { ...state };
            action.payload.forEach((field) => { newState[field] = ""; });
            return newState;
        }
         case "SET_ROLES":
            return { ...state, roles: action.payload.data };
        default:
            return state;
    }
}
