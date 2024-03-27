import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash, faPencilAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from 'react-redux';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

function RoleList() {
    const user = useSelector((state) => state.SetUserReducer.user);
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${BASE_URL}${ROLE_URL}`)
            .then((response) => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    };

    const toggleRowSelection = (rowId) => {
        const isSelected = selectedRows.includes(rowId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const deleteSelectedRows = () => {
        const newData = data.filter((d, i) => !selectedRows.includes(i));
        setData(newData);
        selectedRows.forEach(rowId => {
            axios.delete(`${BASE_URL}${ROLE_URL}/${data[rowId].id}`)
                .then(res => {
                    console.log("Deleted successfully.");
                })
                .catch(err => console.log(err));
        });
        setSelectedRows([]);
    };

    const handleEdit = (rowId) => {
        setEditingRow(rowId);
        setEditedRoleName(data[rowId].rolename);
    };

    const handleSave = () => {
        const newData = data.map((d, i) => {
            if (i === editingRow) {
                return { ...d, rolename: editedRoleName };
            }
            return d;
        });
        setData(newData);
        axios.put(`${BASE_URL}${ROLE_URL}/${data[editingRow].id}`, { rolename: editedRoleName })
            .then(res => {
                console.log("Data saved successfully.");
                setEditingRow(null); 
            })
            .catch(err => console.log(err));
    };

    const handleMoreOptions = () => {
        if (selectedRows.length === 1) {
            const selectedRole = data[selectedRows[0]];
            navigate(`/rolesManagement/RoleOverview`, { state: { roleData: selectedRole } }); 
        }
    };

    return (
        <div className="mb-5 mx-2">
            <Row>
                <div className="filter-box mb-5">
                    <InputGroup className="w-25">
                        <Form.Control
                            className="bg-white form-control-filter"
                            placeholder="Search by role name"
                            aria-label="Search"
                            value={editedRoleName}
                            onChange={(e) => setEditedRoleName(e.target.value)}
                        />
                        <Button
                            variant="primary"
                            className="form-btn"
                            id="button-addon2"
                            onClick={handleSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </Button>
                        <Button
                            variant="primary"
                            className="form-btn"
                            id="button-addon2"
                            onClick={deleteSelectedRows}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                            variant="primary"
                            className="form-btn"
                            id="button-addon2"
                            onClick={() => handleEdit(selectedRows[0])} // Pass selected row ID to handleEdit
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button
                            variant="primary"
                            className="form-btn"
                            id="button-addon2"
                            onClick={handleMoreOptions}
                        >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </Button>
                    </InputGroup>
                </div>
            </Row>

            <table className="table" border={1}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Role name</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="view"
                                    onChange={() => toggleRowSelection(i)}
                                    checked={selectedRows.includes(i)}
                                />
                            </td>
                            <td>
                                {editingRow === i ? (
                                    <input
                                        type="text"
                                        value={editedRoleName}
                                        onChange={(e) => setEditedRoleName(e.target.value)}
                                    />
                                ) : (
                                    item.rolename
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RoleList;
