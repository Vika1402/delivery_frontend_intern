import axiosInstance from "../../utility/axiosSetup";
import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./user.register.constant";

export const registerUser = (userData) => async (dispatch) => {
  try {
    console.log(userData);
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axiosInstance.post("/api/user/register", userData);
    // console.log(data);
    if (data) {
      // User is registered successfully, notify the user or store user data as needed
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.data.user, // You can save the user in Redux if needed
      });
    } else {
      console.error("Registration failed");
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};
