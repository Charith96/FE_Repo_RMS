import axios from "axios";
import { toastFunction } from "../../components/ToastComponent";
import { USER_URL, BASE_URL, ROLE_URL, COMPANY_URL, RESERVATION_ITEM } from "../../utils/Constants";
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
    console.log("Data fetched successfully");
  } catch (error) {
    dispatch({ type: ActionTypes.GET_USERS_FAIL, payload: error });
    console.error("Error fetching data:", error);
  }
};

export const fetchCompanyData = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_COMPANY_REQUEST }); 
    const response = await axios.get(`${BASE_URL}${COMPANY_URL}`);

    dispatch({ type: ActionTypes.GET_COMPANY_SUCCESS, payload: response.data }); 
  } catch (error) {
    dispatch({ type: ActionTypes.GET_COMPANY_FAIL, payload: error.message || "An error occurred" }); 
  }
};

export const fetchRoleData = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_ROLES_REQUEST }); 
    const response = await axios.get(`${BASE_URL}${ROLE_URL}`);

    dispatch({ type: ActionTypes.GET_ROLES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ActionTypes.GET_ROLES_FAIL, payload: error.message || "An error occurred" }); 
  }
};
export const fetchItemData = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_ITEM_REQUEST }); 
    const response = await axios.get(`${BASE_URL}${RESERVATION_ITEM}`);

    dispatch({ type: ActionTypes.GET_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ActionTypes.GET_ITEM_FAIL, payload: error.message || "An error occurred" }); 
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}${USER_URL}`, userData);
    dispatch({ type: ActionTypes.CREATE_USER_SUCCESS, payload: response.data });
    toastFunction("User created successfully", false);
  } catch (error) {
    console.error("Error creating user:", error);
    toastFunction("Error creating user", true);
  }
};

export const updateUserData = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}${USER_URL}/${id}`, updatedUserData);
   
    dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS , payload: response.data });
    console.log("User data updated successfully");
  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_USER_FAIL , payload: error });
    console.error("Error updating user data:", error);
  }
};

export const deleteUser = (id) => async (dispatch) => { 
  try {
    await axios.delete(`${BASE_URL}${USER_URL}/${id}`);
    dispatch(fetchData());
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
