import axiosInstance from "../../utility/axiosSetup";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from "../userRedux/user.constant";

// Login Action
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axiosInstance.post("/api/user/login", credentials);

    if (data) {
      // Save the token and user data in localStorage on successful login
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data.user,
      });
    } else {
      console.error("Login failed");
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login failed:", error);
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Logout Action
export const logoutUser = () => (dispatch) => {
  console.log("Logging out user...");
  localStorage.removeItem("accessToken"); // Remove token
  localStorage.removeItem("user"); // Remove user data
  dispatch({ type: USER_LOGOUT });
};
