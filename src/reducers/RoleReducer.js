export const initialState = {
    role: [],
    roleId: "",
    name: "",
    loading: false,
    
};

export function reducer(state, action) {
    switch (action.type) {
        case "SET_ROLES":
            return { ...state, role: action.payload.data, loading: false }
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_FIELDS":
            return { ...state, ...action.payload }
        case "RESERT_FIELD":
            return { roleId: "", name: "" }
        default:
            return state;
    }
}
