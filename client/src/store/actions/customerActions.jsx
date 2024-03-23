import axios from "axios";
import { CUSTOMER_URL } from "../../util/Constants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCustomers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${CUSTOMER_URL}`);
    dispatch({ type: "FETCH_CUSTOMERS_SUCCESS", payload: response.data });
    console.log("Data :", response.data);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

export const fetchCustomer = (customerId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${CUSTOMER_URL}/${customerId}`
    );
    dispatch({ type: "FETCH_CUSTOMER_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching customer:", error);
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
    console.error("Error updating customer:", error);
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${CUSTOMER_URL}/${customerId}`);
    dispatch({ type: "DELETE_CUSTOMER_SUCCESS", payload: customerId });
  } catch (error) {
    console.error("Error deleting customer:", error);
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
    console.error("Error creating customer:", error);
  }
};