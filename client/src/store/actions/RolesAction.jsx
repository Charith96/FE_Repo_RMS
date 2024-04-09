

import axios from 'axios';
import {
    FETCH_ROLES_REQUEST,
    FETCH_ROLES_SUCCESS,
    FETCH_ROLES_FAILURE,
    CREATE_ROLE_REQUEST,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAILURE,
    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAILURE,
    DELETE_ROLE_REQUEST,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAILURE
} from './ActionTypes';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

export const fetchRoles = () => {
    return async dispatch => {
        dispatch(fetchRolesRequest());
        try {
            const response = await axios.get(`${BASE_URL}${ROLE_URL}`);
            dispatch(fetchRolesSuccess(response.data));
        } catch (error) {
            dispatch(fetchRolesFailure(error));
        }
    };
};

export const fetchRolesRequest = () => {
    return {
        type: FETCH_ROLES_REQUEST
    };
};

export const fetchRolesSuccess = roles => {
    return {
        type: FETCH_ROLES_SUCCESS,
        payload: roles
    };
};

export const fetchRolesFailure = error => {
    return {
        type: FETCH_ROLES_FAILURE,
        payload: error
    };
};

export const createRole = (roleData) => {
    return async dispatch => {
        dispatch(createRoleRequest());
        try {
            const response = await axios.post(`${BASE_URL}${ROLE_URL}`, roleData);
            dispatch(createRoleSuccess(response.data));
        } catch (error) {
            dispatch(createRoleFailure(error));
        }
    };
};

export const createRoleRequest = () => {
    return {
        type: CREATE_ROLE_REQUEST
    };
};

export const createRoleSuccess = role => {
    return {
        type: CREATE_ROLE_SUCCESS,
        payload: role
    };
};

export const createRoleFailure = error => {
    return {
        type: CREATE_ROLE_FAILURE,
        payload: error
    };
};

export const updateRole = (roleId, roleData) => {
    return async dispatch => {
        dispatch(updateRoleRequest());
        try {
            const response = await axios.put(`${BASE_URL}${ROLE_URL}/${roleId}`, roleData);
            dispatch(updateRoleSuccess(response.data));
        } catch (error) {
            dispatch(updateRoleFailure(error));
        }
    };
};

export const updateRoleRequest = () => {
    return {
        type: UPDATE_ROLE_REQUEST
    };
};

export const updateRoleSuccess = role => {
    return {
        type: UPDATE_ROLE_SUCCESS,
        payload: role
    };
};

export const updateRoleFailure = error => {
    return {
        type: UPDATE_ROLE_FAILURE,
        payload: error
    };
};

export const deleteRole = (roleId) => {
    return async dispatch => {
        dispatch(deleteRoleRequest());
        try {
            await axios.delete(`${BASE_URL}${ROLE_URL}/${roleId}`);
            dispatch(deleteRoleSuccess(roleId));
        } catch (error) {
            dispatch(deleteRoleFailure(error));
        }
    };
};

export const deleteRoleRequest = () => {
    return {
        type: DELETE_ROLE_REQUEST
    };
};

export const deleteRoleSuccess = roleId => {
    return {
        type: DELETE_ROLE_SUCCESS,
        payload: roleId
    };
};

export const deleteRoleFailure = error => {
    return {
        type: DELETE_ROLE_FAILURE,
        payload: error
    };
};
