import { ADD_MENU_ITEM, GET_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM } from "./menu.constant";

const initialState = {
  menuItems: [], // To hold the fetched menu items
  message: null, // Message for success or failure of add menu item
  error: null, // To store any error message from GET request
  loading: true, // To show loading state when fetching data
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MENU_ITEM:
      return {
        ...state,
        message: action.payload.message, // Store success or failure message
        ...(action.payload.newItem
          ? { menuItems: [...state.menuItems, action.payload.newItem] } // Add the new menu item to the state
          : {}),
      };

    case GET_MENU_ITEM:
      return {
        ...state,
        menuItems: action.payload.menuItems, // Update the menu items
        error: action.payload.error || null, // Update error message if any
        loading: false, // Set loading to false after fetching
      };

    case UPDATE_MENU_ITEM:
      return {
        ...state,
        menuItems: action.payload.success
          ? state.menuItems.map((item) =>
              item._id === action.payload.updatedItem._id
                ? { ...item, ...action.payload.updatedItem } // Update the specific item
                : item
            ) // Replace the updated item with the new one
          : state.menuItems, // Keep the existing items if update fails
        error: action.payload.success ? null : action.payload.message, // Set error if update fails
        loading: false, // Ensure loading is set to false
      };

    case DELETE_MENU_ITEM:
      return {
        ...state,
        menuItems: action.payload.success
          ? state.menuItems.filter((item) => item._id !== action.payload.id) // Remove the deleted item from the list
          : state.menuItems, // Keep existing items if deletion fails
        error: action.payload.success ? null : action.payload.message, // Set error if deletion fails
        loading: false, // Ensure loading is set to false
      };

    default:
      return state;
  }
};

export default menuReducer;
