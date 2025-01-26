// orderReducer.js

import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "./orderConstant";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: [action.payload, ...state.orders],
      };
    case PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
