import axios from "axios";
import {
  COMPANY_DETAILS,
  COUNTRY_URL,
  CURRENCY_URL,
} from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Action creator for creating a new company
export const createCompany = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_COMPANY_START }); // Dispatch action to indicate start of company creation

    const response = await axios.post(`${BASE_URL}${COMPANY_DETAILS}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      dispatch({
        type: ActionTypes.CREATE_COMPANY_SUCCESS,
        payload: response.data,
      }); // Dispatch action with successful response data
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_COMPANY_FAIL,
      payload: error.message,
    }); // Dispatch action with error message
  }
};

// Action creator for editing an existing company
export const editCompany = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_COMPANY_START }); // Dispatch action to indicate start of company editing
    const url = `${BASE_URL}${COMPANY_DETAILS}/${id}`;

    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.EDIT_COMPANY_SUCCESS,
        payload: response.data,
      }); // Dispatch action with successful response data
    }
  } catch (error) {
    dispatch({ type: ActionTypes.EDIT_COMPANY_FAIL, payload: error }); // Dispatch action with error
  }
};

// Action creator for deleting a company
export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_COMPANY_START }); // Dispatch action to indicate start of company deletion
    const response = await axios.delete(`${BASE_URL}${COMPANY_DETAILS}/${id}`);
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_COMPANY_SUCCESS,
        payload: response.data,
      }); // Dispatch action with successful response data
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_COMPANY_FAIL,
      payload: error,
    }); // Dispatch action with error
  }
};

// Action creator for fetching all companies
export const fetchCompanies = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_COMPANY_START }); // Dispatch action to indicate start of fetching companies
    const response = await axios.get(`${BASE_URL}${COMPANY_DETAILS}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_COMPANY_SUCCESS,
        payload: response.data,
      }); // Dispatch action with successful response data
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_COMPANY_FAIL,
      payload: error.message,
    }); // Dispatch action with error message
  }
};

// Action creator for fetching a company by ID
export const fetchCompaniesById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_COMPANY_START_BY_ID }); // Dispatch action to indicate start of fetching company by ID
    const response = await axios.get(`${BASE_URL}${COMPANY_DETAILS}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_COMPANY_SUCCESS_BY_ID,
        payload: response.data,
      }); // Dispatch action with successful response data
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_COMPANY_FAIL_BY_ID,
      payload: error.message,
    }); // Dispatch action with error message
  }
};

// Action creator for resetting the company state
export const resetCompanyState = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_COMPANY_SUCCESS,
    payload: data || [],
  }); // Dispatch action with optional data or an empty array
  dispatch({ type: ActionTypes.GET_COMPANY_FAIL, payload: null }); // Dispatch action to reset the failure state
};

// Action creator for resetting the manage company state
export const resetManageCompanyState = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_COMPANY_SUCCESS,
    payload: null,
  }); // Dispatch action to reset the create company success state
  dispatch({ type: ActionTypes.GET_COMPANY_FAIL, payload: null }); // Dispatch action to reset the failure state
};

// Action creator for fetching countries
export const fetchCountries = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_COUNTRIES_START }); // Dispatch action to indicate start of fetching countries
    try {
      const response = await fetch(`${BASE_URL}${COUNTRY_URL}`); // Assuming db.json is served at this URL
      const data = await response.json();
      dispatch({ type: ActionTypes.FETCH_COUNTRIES_SUCCESS, payload: data }); // Dispatch action with successful response data
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_COUNTRIES_FAIL,
        error: error.message,
      }); // Dispatch action with error message
    }
  };
};

// Action creator for fetching currencies
export const fetchCurrencies = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_CURRENCIES_START }); // Dispatch action to indicate start of fetching currencies
    try {
      const response = await fetch(`${BASE_URL}${CURRENCY_URL}`); // Assuming db.json is served at this URL
      const data = await response.json();
      dispatch({ type: ActionTypes.FETCH_CURRENCIES_SUCCESS, payload: data }); // Dispatch action with successful response data
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_CURRENCIES_FAIL,
        error: error.message,
      }); // Dispatch action with error message
    }
  };
};