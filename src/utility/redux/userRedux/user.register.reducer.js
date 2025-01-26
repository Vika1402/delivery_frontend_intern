import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./user.register.constant";

const initialState = {
  loading: false,
  registrationError: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, registrationError: null };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false };
    case USER_REGISTER_FAILURE:
      return { ...state, loading: false, registrationError: action.payload };
    default:
      return state;
  }
};

export default registerReducer;
