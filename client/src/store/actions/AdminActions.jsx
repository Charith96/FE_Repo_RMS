import axios from "axios";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
import { ADMIN_URL } from "../../utils/Constants.jsx";
//const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:3005";

const getToken = () => localStorage.getItem('token');
const token = getToken();

export const createAdmin = (data) => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.CREATE_ADMIN_START });
  
      const response = await axios.post(`${BASE_URL}${ADMIN_URL}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        dispatch({
          type: ActionTypes.CREATE_ADMIN_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.CREATE_ADMIN_FAIL,
        payload: error.message,
      });
    }
  };

  export const fetchAdmins = () => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.GET_ADMIN_START });
      const response = await axios.get(`${BASE_URL}${ADMIN_URL}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch({
          type: ActionTypes.GET_ADMIN_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.GET_ADMIN_FAIL,
        payload: error.message,
      });
    }
  };