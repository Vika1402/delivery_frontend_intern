import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "./userRedux/user.reducer.js";
import { USER_LOGIN_SUCCESS } from "./userRedux/user.constant";
import menuReducer from "./menuRedux/menu.reducer.js";
import registerReducer from "./userRedux/user.register.reducer.js";
import { orderReducer } from "./orderRedux/orderReducer.js";

// Function to load user data from localStorage
const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && user) {
    return {
      user: JSON.parse(user),
      accessToken,
    };
  }
  return {};
};

// Load persisted state (user data) from localStorage
const persistedState = loadUserFromLocalStorage();

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  register: registerReducer,
  orders: orderReducer,
});

// Create store with persisted state (if any)
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

// If there's a logged-in user, dispatch the login success action to update the store
if (persistedState.user) {
  store.dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: persistedState.user, // Only dispatch the user data
  });
}

export default store;
