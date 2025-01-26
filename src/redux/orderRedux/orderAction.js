// orderActions.js
import axios from "axios";
import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "./orderConstant";
import axiosInstance from "../../utility/axiosSetup";

// Action to place an order
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    console.log(orderData);

    const { data } = await axiosInstance.post("/api/order", orderData);

    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data.data.order,
    });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to get all orders
export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });

    const { data } = await axiosInstance.get("/api/orders");

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data.data.orders,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
