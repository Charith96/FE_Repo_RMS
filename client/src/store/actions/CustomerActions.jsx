import axios from "axios";
import { CUSTOMER_URL } from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FETCH_CUSTOMER_REQUEST });

    const response = await axios.get(`${BASE_URL}${CUSTOMER_URL}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.FETCH_CUSTOMER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_CUSTOMER_FAILURE,
      payload: error.message,
    });
  }
};
export const fetchCustomersById = (customerId) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FETCH_CUSTOMER_REQUEST_BY_ID });

    const response = await axios.get(
      `${BASE_URL}${CUSTOMER_URL}/${customerId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.FETCH_CUSTOMER_SUCCESS_BY_ID,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_CUSTOMER_FAILURE_BY_ID,
      payload: error.message,
    });
  }
};

export const resetCustomerState = (customer) => (dispatch) => {
  dispatch({
    type: ActionTypes.FETCH_CUSTOMER_SUCCESS,
    payload: customer || [],
  });
  dispatch({ type: ActionTypes.FETCH_CUSTOMER_FAILURE, payload: null });
};

export const resetManageCustomerState = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_CUSTOMER_SUCCESS,
    payload: null,
  });
  dispatch({ type: ActionTypes.FETCH_CUSTOMER_FAILURE, payload: null });
};

export const editCustomer = (customerId, customer) => async (dispatch) => {
  dispatch({ type: ActionTypes.UPDATE_CUSTOMER_REQUEST });
  try {
    const url = `${BASE_URL}${CUSTOMER_URL}/${customerId}`;

    const response = await axios.put(url, customer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.UPDATE_CUSTOMER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_CUSTOMER_FAILURE, payload: error });
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_CUSTOMER_REQUEST });

    const response = await axios.delete(
      `${BASE_URL}${CUSTOMER_URL}/${customerId}`
    );
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_CUSTOMER_SUCCESS,
        payload: customerId,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.DELETE_CUSTOMER_FAILURE, payload: error });
  }
};

export const createCustomer = (customer) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_CUSTOMER_REQUEST });

    const response = await axios.post(`${BASE_URL}${CUSTOMER_URL}`, customer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      dispatch({
        type: ActionTypes.CREATE_CUSTOMER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_CUSTOMER_FAILURE,
      payload: error.message,
    });
  }
};