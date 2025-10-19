export const initialState = {
    permission: [],
    permissionId: "",
    name: "",
    loading: false,
    
};

export function reducer(state, action) {
    switch (action.type) {
        case "SET_PERMISSIONS":
            return { ...state, permission: action.payload.data, loading: false }
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_FIELDS":
            return { ...state, ...action.payload }
        case "RESET_FIELD":
            return { permissionId: "", name: "" }
        default:
            return state;
    }
}
