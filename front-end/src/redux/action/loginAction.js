import axios from "axios";
import { LOGIN_FAILD, LOGIN_SUCESS } from "../types/login";

export const onLogin = (url, data) => async (dispatch) => {
  try {
    const response = await axios.post(url, data);
    if (response.data.success) {
      dispatch({
        type: LOGIN_SUCESS,
        payload: response.data.token,
      });
    } else {
      dispatch({
        type: LOGIN_FAILD,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILD,
      payload: error.message,
    });
  }
};
