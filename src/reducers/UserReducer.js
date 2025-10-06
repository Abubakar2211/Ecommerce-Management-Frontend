export const initialState = {
  user: [],
  nextPage: null,
  prevPage: null,
  passwordChange: false,
  selectedUser: null,
  password: "",
  confirmPassword: "",
  loading: true,
};

export function userReducer(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state, user: action.payload.data, nextPage: action.payload.next, prevPage: action.payload.prev, loading: false,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "TOGGLE_PASSWORD_MODAL":
      return { ...state, passwordChange: action.payload.status, selectedUser: action.payload.user,
      };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "RESET_PASSWORD_FIELDS":
      return { ...state, password: "", confirmPassword: "" };
    default:
      return state;
  }
}
