import axios from 'axios';
import ActionTypes from "../../data/ReduxActionTypes";
import { ROLE_URL } from "../../utils/Constants";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createRole = (rolecode, rolename, privileges) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.MANAGE_ROLE_START });
    const response = await axios.post(`${BASE_URL}${ROLE_URL}`, { rolecode, rolename, privileges });
    if (response.status === 201) {
      dispatch({ type: ActionTypes.CREATE_ROLE_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.CREATE_ROLE_FAIL, payload: error });
  }
};

export const fetchRoles = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FETCH_ROLES_START });
    const response = await axios.get(`${BASE_URL}${ROLE_URL}`);
    if (response.status === 200) {
      dispatch({ type: ActionTypes.FETCH_ROLES_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.FETCH_ROLES_FAILURE, payload: error });
  }
};

export const deleteRole = (roleIds) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_ROLE_START });
    const response = await axios.delete(`${BASE_URL}${ROLE_URL}/${roleIds}`);
    if (response.status === 200) {
      dispatch({ type: ActionTypes.DELETE_ROLE_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.DELETE_ROLE_FAILURE, payload: error });
  }
};

export const updateRole = (roleId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.MANAGE_ROLE_START });
    const response = await axios.put(`${BASE_URL}${ROLE_URL}/${roleId}`, updatedData);
    if (response.status === 200) {
      dispatch({ type: ActionTypes.UPDATE_ROLE_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_ROLE_FAILURE, payload: error });
  }
};
