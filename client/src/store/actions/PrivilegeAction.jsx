import axios from "axios";
import ActionTypes from "../../data/ReduxActionTypes";
import {
  PRIVILEGE_URL,
  ROLE_PRIVILEGE_URL,
  GET_ROLE_PRIVILEGE_URL,
  DELETE_ROLE_PRIVILEGE_URL,
} from "../../utils/Constants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Privilege Actions
export const fetchPrivileges = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FETCH_PRIVILEGES_START });
    const response = await axios.get(`${BASE_URL}${PRIVILEGE_URL}`);
    dispatch({
      type: ActionTypes.FETCH_PRIVILEGES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_PRIVILEGES_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

export const createPrivilege = (privilege) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_PRIVILEGE_START });
    const response = await axios.post(`${BASE_URL}${PRIVILEGE_URL}`, privilege);
    dispatch({
      type: ActionTypes.CREATE_PRIVILEGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_PRIVILEGE_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};

export const deletePrivilege = (privilegeId) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_PRIVILEGE_START });
    await axios.delete(`${BASE_URL}${PRIVILEGE_URL}/${privilegeId}`);
    dispatch({
      type: ActionTypes.DELETE_PRIVILEGE_SUCCESS,
      payload: privilegeId,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_PRIVILEGE_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};

// RolePrivilege Actions
export const fetchRolePrivileges = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FETCH_ROLE_PRIVILEGES_START });
    const response = await axios.get(
      `${BASE_URL}${GET_ROLE_PRIVILEGE_URL}?roleCode=${id}`
    );
    dispatch({
      type: ActionTypes.FETCH_ROLE_PRIVILEGES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_ROLE_PRIVILEGES_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

export const createRolePrivilege = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_ROLE_PRIVILEGE_START });
    const response = await axios.post(
      `${BASE_URL}${ROLE_PRIVILEGE_URL}`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: ActionTypes.CREATE_ROLE_PRIVILEGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_ROLE_PRIVILEGE_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};

export const deleteRolePrivilege = (rolePrivilegeId) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_ROLE_PRIVILEGE_START });
    await axios.delete(`${BASE_URL}${DELETE_ROLE_PRIVILEGE_URL}/${rolePrivilegeId}`);
    dispatch({
      type: ActionTypes.DELETE_ROLE_PRIVILEGE_SUCCESS,
      payload: rolePrivilegeId,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_ROLE_PRIVILEGE_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};
export const updateRolePrivilege = (rolePrivilege) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.UPDATE_ROLE_PRIVILEGE_START });
    const response = await axios.put(
      `${BASE_URL}${ROLE_PRIVILEGE_URL}`,
      rolePrivilege,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_ROLE_PRIVILEGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.UPDATE_ROLE_PRIVILEGE_FAIL,
      payload: error.response?.data || error.message,
    });
  }
};
