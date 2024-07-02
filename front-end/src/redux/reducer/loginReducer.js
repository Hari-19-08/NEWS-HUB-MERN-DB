import { LOGIN_FAILD, LOGIN_SUCESS } from "../types/login";

const initialState = {
    data: null,
    error: null,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCESS:
        return {
          ...state,
          data: action.payload,
          error: null,
        };
      case LOGIN_FAILD:
        return {
          ...state,
          data: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  