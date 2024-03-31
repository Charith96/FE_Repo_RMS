import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

function RoleList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        fetchData();

        if (location.state && location.state.newRoleName) {
            console.log("New Role Name:", location.state.newRoleName);
        }
    }, []);

    const fetchData = () => {
        axios.get(`${BASE_URL}${ROLE_URL}`)
            .then((response) => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="role-list-container">
            <h2>Roles List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Role Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(role => (
                        <tr key={role.id}>
                            <td>{role.id}</td>
                            <td>{role.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RoleList;
