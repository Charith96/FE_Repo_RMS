import axios from "axios";
import {
  USERCOMPANIES_URL,
  USERROLES_URL,
  USER_URL,
} from "../../utils/Constants";
import ActionTypes from "../../data/ReduxActionTypes";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem('token');
const token = getToken();

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
    const response = await axios.post(`${BASE_URL}${USER_URL}`, userData,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    dispatch({ type: ActionTypes.CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ActionTypes.CREATE_USER_FAIL, payload: error });
  }
};

export const updateUserData = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${USER_URL}/${id}`,
      updatedUserData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_USER_FAIL, payload: error });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${USER_URL}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    dispatch(fetchData());
  } catch (error) {
    dispatch({ type: ActionTypes.DELETE_USER_FAIL, payload: error });
  }
};
export const fetchUserRoleData = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${USERROLES_URL}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: ActionTypes.GET_USERROLES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_USERROLES_FAIL,
      payload: error.message || "An error occurred",
    });
  }
};

// Fetch All Roles
export const fetchUserRoles = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${USERROLES_URL}`);

    dispatch({
      type: ActionTypes.GET_USERROLES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ActionTypes.GET_USERROLES_FAIL, payload: error });
  }
};

// Create Role
export const createUserRole = (roleData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}${USERROLES_URL}`, roleData,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    dispatch({
      type: ActionTypes.CREATE_USERROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ActionTypes.CREATE_USERROLE_FAIL, payload: error });
  }
};

// Update Role
export const updateUserRoleData = (id, updatedRoleData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${USERROLES_URL}/${id}`,
      updatedRoleData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ActionTypes.UPDATE_USERROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_USERROLE_FAIL, payload: error });
  }
};

// Delete Role
export const deleteUserRole = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${USERROLES_URL}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    dispatch(fetchUserRoles());
  } catch (error) {
    dispatch({ type: ActionTypes.DELETE_USERROLE_FAIL, payload: error });
  }
};

// Fetch All Companies
export const fetchUserCompanies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${USERCOMPANIES_URL}`);

    dispatch({
      type: ActionTypes.GET_USERCOMPANIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ActionTypes.GET_USERCOMPANIES_FAIL, payload: error });
  }
};

// Create Company
export const createUserCompany = (companyData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${USERCOMPANIES_URL}`,
      companyData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: ActionTypes.CREATE_USERCOMPANY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ActionTypes.CREATE_USERCOMPANY_FAIL, payload: error });
  }
};

// Update Company
export const updateUserCompanyData =
  (id, updatedCompanyData) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${BASE_URL}${USERCOMPANIES_URL}/${id}`,
        updatedCompanyData,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: ActionTypes.UPDATE_USERCOMPANY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.UPDATE_USERCOMPANY_FAIL,
        payload: error,
      });
    }
  };

// Delete Company
export const deleteUserCompany = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${USERCOMPANIES_URL}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    dispatch(fetchUserCompanies());
  } catch (error) {
    dispatch({ type: ActionTypes.DELETE_USERCOMPANY_FAIL, payload: error });
  }
};
