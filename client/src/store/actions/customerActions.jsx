import axios from "axios";
import { CUSTOMER_URL } from "../../utils/Constants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCustomers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${CUSTOMER_URL}`);
    dispatch({ type: "FETCH_CUSTOMERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_CUSTOMERS_FAILURE", payload: error.message });
  }
};

export const fetchCustomer = (customerId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${CUSTOMER_URL}/${customerId}`
    );
    dispatch({ type: "FETCH_CUSTOMER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_CUSTOMER_FAILURE", payload: error.message });
  }
};

export const updateCustomer = (customerId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${CUSTOMER_URL}/${customerId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "UPDATE_CUSTOMER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_CUSTOMER_FAILURE", payload: error.message });
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${CUSTOMER_URL}/${customerId}`);
    dispatch({ type: "DELETE_CUSTOMER_SUCCESS", payload: customerId });
  } catch (error) {
    dispatch({ type: "DELETE_CUSTOMER_FAILURE", payload: error.message });
  }
};

export const createCustomer = (customer) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}${CUSTOMER_URL}`, customer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "CREATE_CUSTOMER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "CREATE_CUSTOMER_FAILURE", payload: error.message });
  }
};
