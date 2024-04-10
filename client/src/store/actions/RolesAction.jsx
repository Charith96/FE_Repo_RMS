// RoleAction.jsx

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

export const createRole = async (rolecode, rolename, privileges) => {
    try {
        const response = await axios.post(`${BASE_URL}${ROLE_URL}`, {
            rolecode,
            rolename,
            privileges,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchRoles = () => {
    return axios.get(`${BASE_URL}${ROLE_URL}`);
};

export const deleteRole = (roleIds) => {
    return axios.delete(`${BASE_URL}${ROLE_URL}/${roleIds}`);
};

export const updateRole = (roleId, updatedData) => {
    return axios.put(`${BASE_URL}${ROLE_URL}/${roleId}`, updatedData);
};
