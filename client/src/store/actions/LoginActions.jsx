import axios from "axios";
import { LOGIN_URL } from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem('token');
const token = getToken();

export const login = (data) => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.LOGIN_START });
  
      const response = await axios.post(`${BASE_URL}${LOGIN_URL}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.LOGIN_FAIL,
        payload: error.message,
      });
    }
  };

  export const resetLogin = () => (dispatch) => {
    dispatch({ type: ActionTypes.RESET_LOGIN });
  };