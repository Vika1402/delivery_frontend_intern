import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./user.constant";

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
  registrationError: null, // Store registration errors if needed
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login Cases
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Logout Case
    case USER_LOGOUT:
      return { ...state, user: null, isAuthenticated: false };

    default:
      return state;
  }
};
