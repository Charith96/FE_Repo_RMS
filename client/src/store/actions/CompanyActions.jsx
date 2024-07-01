import axios from "axios";
import {
  COMPANY_DETAILS,
  COUNTRY_URL,
  CURRENCY_URL,
} from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem('token');
const token = getToken();

// Action creator for creating a new company
export const createCompany = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_COMPANY_START });
    const response = await axios.post(`${BASE_URL}${COMPANY_DETAILS}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      dispatch({
        type: ActionTypes.CREATE_COMPANY_SUCCESS,
        payload: response.data,
      });
      return {
        type: ActionTypes.CREATE_COMPANY_SUCCESS,
        payload: response.data,
      };
    }
  } catch (error) {
    //  console.error("Error creating company:", error);
    dispatch({
      type: ActionTypes.CREATE_COMPANY_FAIL,
      payload: error.message,
    });
    return { type: ActionTypes.CREATE_COMPANY_FAIL, payload: error.message };
  }
};

// Action creator for editing an existing company
export const editCompany = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_COMPANY_START });
    const url = `${BASE_URL}${COMPANY_DETAILS}/${id}`;
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.EDIT_COMPANY_SUCCESS,
        payload: response.data,
      });
      return { type: ActionTypes.EDIT_COMPANY_SUCCESS, payload: response.data };
    }
  } catch (error) {
    //console.error("Error editing company:", error);
    dispatch({ type: ActionTypes.EDIT_COMPANY_FAIL, payload: error.message });
    return { type: ActionTypes.EDIT_COMPANY_FAIL, payload: error.message };
  }
};

//Action creator for deleting a company
export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_COMPANY_START });
    const response = await axios.delete(`${BASE_URL}${COMPANY_DETAILS}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_COMPANY_SUCCESS,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_COMPANY_FAIL,
      payload: error.response?.data || error.message,
    });
    throw error; // This is important to propagate the error
  }
};


// Action creator for fetching all companies
export const fetchCompanies = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_COMPANY_START });
    const response = await axios.get(`${BASE_URL}${COMPANY_DETAILS}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_COMPANY_SUCCESS,
        payload: response.data,
      });
      return { type: ActionTypes.GET_COMPANY_SUCCESS, payload: response.data };
    }
  } catch (error) {
    console.error("Error fetching companies:", error);
    dispatch({
      type: ActionTypes.GET_COMPANY_FAIL,
      payload: error.message,
    });
    return { type: ActionTypes.GET_COMPANY_FAIL, payload: error.message };
  }
};

// Action creator for fetching a company by ID
export const fetchCompaniesById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_COMPANY_START_BY_ID });
    const response = await axios.get(`${BASE_URL}${COMPANY_DETAILS}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_COMPANY_SUCCESS_BY_ID,
        payload: response.data,
      });
      return {
        type: ActionTypes.GET_COMPANY_SUCCESS_BY_ID,
        payload: response.data,
      };
    }
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    dispatch({
      type: ActionTypes.GET_COMPANY_FAIL_BY_ID,
      payload: error.message,
    });
    return { type: ActionTypes.GET_COMPANY_FAIL_BY_ID, payload: error.message };
  }
};

// Action creator for resetting the company state
export const resetCompanyState = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_COMPANY_SUCCESS,
    payload: data || [],
  });
  dispatch({ type: ActionTypes.GET_COMPANY_FAIL, payload: null });
};

// Action creator for resetting the manage company state
export const resetManageCompanyState = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_COMPANY_SUCCESS,
    payload: null,
  });
  dispatch({ type: ActionTypes.GET_COMPANY_FAIL, payload: null });
};

// Action creator for fetching countries
export const fetchCountries = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FETCH_COUNTRIES_START });
    const response = await axios.get(`${BASE_URL}${COUNTRY_URL}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }});
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.FETCH_COUNTRIES_SUCCESS,
        payload: response.data,
      });
      return {
        type: ActionTypes.FETCH_COUNTRIES_SUCCESS,
        payload: response.data,
      };
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    dispatch({
      type: ActionTypes.FETCH_COUNTRIES_FAIL,
      payload: error.message,
    });
    return { type: ActionTypes.FETCH_COUNTRIES_FAIL, payload: error.message };
  }
};

// Action creator for fetching currencies
export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FETCH_CURRENCIES_START });
    const response = await axios.get(`${BASE_URL}${CURRENCY_URL}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.FETCH_CURRENCIES_SUCCESS,
        payload: response.data,
      });
      return {
        type: ActionTypes.FETCH_CURRENCIES_SUCCESS,
        payload: response.data,
      };
    }
  } catch (error) {
    console.error("Error fetching currencies:", error);
    dispatch({
      type: ActionTypes.FETCH_CURRENCIES_FAIL,
      payload: error.message,
    });
    return { type: ActionTypes.FETCH_CURRENCIES_FAIL, payload: error.message };
  }
};





