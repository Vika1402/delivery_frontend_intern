import {
  ADD_MENU_ITEM,
  DELETE_MENU_ITEM,
  UPDATE_MENU_ITEM,
} from "./menu.constant";
import axiosInstance from "../../utility/axiosSetup.js";
import { GET_MENU_ITEM } from "./menu.constant";
export const addMenuItems = (credentials) => async (dispatch) => {
  try {
    // Make the API call to add the menu item
    const { data } = await axiosInstance.post("/api/menu", credentials);

    if (data.success) {
      // Dispatch once with the success message and menu item data
      dispatch({
        type: ADD_MENU_ITEM,
        payload: {
          message: data.message,
          newItem: data.data.menu, // Pass the new menu item from the API response
        },
      });
    } else {
      throw new Error("Failed to add menu item.");
    }
  } catch (error) {
    // Dispatch once with the error message
    dispatch({
      type: ADD_MENU_ITEM,
      payload: { message: error.message },
    });
    console.error("Error adding menu item:", error.message);
  }
};

// src/redux/menuRedux/menu.action.js

export const getMenuItems = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get("/api/menu"); // Adjust the endpoint as per your backend
    console.log(data);
    if (data.success) {
      dispatch({
        type: GET_MENU_ITEM,
        payload: {
          menuItems: data.data.menu, // Assuming menu items are under `data.data.menu`
        },
      });
    } else {
      throw new Error("Failed to fetch menu items.");
    }
  } catch (error) {
    console.error("Error fetching menu items:", error);
    dispatch({
      type: GET_MENU_ITEM,
      payload: {
        menuItems: [], // Empty array if fetching fails
        error: error.message,
      },
    });
  }
};

export const updateMenuItems = (id, credentials) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.put(`/api/menu/${id}`, credentials);

    // Updating the store with the updated item
    dispatch({
      type: UPDATE_MENU_ITEM,
      payload: {
        success: true,
        message: data.message,
        updatedItem: data.data.menu,
      },
    });

    // Optionally, you can re-fetch the entire list after an update to ensure consistency
    dispatch(getMenuItems()); // Re-fetch the entire list after updating an item
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: UPDATE_MENU_ITEM,
      payload: {
        success: false,
        message: errorMessage,
      },
    });

    console.error("Error updating menu item:", errorMessage);
  }
};

// Action creator to delete a menu item
export const deleteMenuItem = (id) => async (dispatch) => {
  try {
    // Make API call to delete the menu item
    const response = await axiosInstance.delete(`/api/menu/${id}`);

    // Dispatch action if deletion is successful
    dispatch({
      type: DELETE_MENU_ITEM,
      payload: { success: true, id },
    });

    // Optional: Show success message (using toast, for example)
    toast.success("Menu item deleted successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    // Dispatch failure action
    dispatch({
      type: DELETE_MENU_ITEM,
      payload: { success: false, message: errorMessage },
    });

    // Optional: Show error message
    toast.error(errorMessage);
  }
};
