import axios from "axios";
import { toastFunction } from "../../components/ToastComponent";
import { USER_URL, BASE_URL } from "../../utils/Constants";
import ActionTypes from '../../data/ReduxActionTypes';

export const fetchUserData = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${USER_URL}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: ActionTypes.GET_USERS_SUCCESSID,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_USERS_FAILID,
      payload: error.message || "An error occurred",
    });
  }
};


export const fetchData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${USER_URL}`);
   
    dispatch({ type: ActionTypes.GET_USERS_SUCCESS, payload: response.data });
 
  } catch (error) {
    dispatch({ type: ActionTypes.GET_USERS_FAIL, payload: error });

  }
};




export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}${USER_URL}`, userData);
    dispatch({ type: ActionTypes.CREATE_USER_SUCCESS, payload: response.data });
    toastFunction("Create user Succesfully", false);
  } catch (error) {
    dispatch({ type: ActionTypes.CREATE_USER_FAIL , payload: error });
    toastFunction("Error creating User", true);
  }
};

export const updateUserData = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}${USER_URL}/${id}`, updatedUserData);
   
    dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS , payload: response.data });

  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_USER_FAIL , payload: error });

  }
};

export const deleteUser = (id) => async (dispatch) => { 
  try {
    await axios.delete(`${BASE_URL}${USER_URL}/${id}`);
    dispatch(fetchData());
   
  } catch (error) {

dispatch({ type: ActionTypes.DELETE_USER_FAIL , payload: error });
  }
};
