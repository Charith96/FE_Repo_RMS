import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash, faPencilAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import TitleActionBar from "../../components/TitleActionsBar";

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

    const handleCreate = () => {
        navigate("/rolesManagement/CreateRole");
    };

    const handleEditIconClick = () => {
        if (selectedRows.length === 1) {
            handleEdit(selectedRows[0]);
        }
    };

    return (
        <div className="mb-5 mx-2">
            <TitleActionBar
                Title={"Roles List"}
                PlusIcon={<FontAwesomeIcon icon={faSave} onClick={handleCreate} />}
                SaveIcon={<FontAwesomeIcon icon={faSave} onClick={handleSave} />}
                DeleteIcon={<FontAwesomeIcon icon={faTrash} onClick={deleteSelectedRows} />}
                MoreOptionsIcon={<FontAwesomeIcon icon={faEllipsisV} onClick={handleMoreOptions} />}
                EditIcon={<FontAwesomeIcon icon={faPencilAlt} onClick={handleEditIconClick} />}
            />

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
