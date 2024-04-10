import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoles, deleteRole, updateRole, createRole } from '../../store/actions/RolesAction';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleActionBar from "../../components/TitleActionsBar";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import {
    faSave,
    faTrash,
    faPencilAlt,
    faEllipsisV,
    faEllipsisH,
    faMagnifyingGlass,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

function RoleList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const roleName = location.state && location.state.roleName ? location.state.roleName : '';

    const roles = useSelector(state => state.roles || []);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);

    const [selectedRows, setSelectedRows] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const [searchValue, setSearchValue] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(roles);
    }, [roles]);

    const handleDelete = async (roleId) => {
        try {
            await dispatch(deleteRole(roleId));
            dispatch(fetchRoles());
        } catch (error) {
            console.error('Error deleting role:', error);
            // Handle error gracefully, e.g., show error message to user
        }
    };

    const toggleRowSelection = (rowId) => {
        const isSelected = selectedRows.includes(rowId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const handleEdit = (rowId) => {
        setEditingRow(rowId);
        setEditedRoleName(filteredData[rowId].rolename);
    };

    const handleSave = async () => {
        try {
            const updatedData = [...filteredData];
            updatedData[editingRow].rolename = editedRoleName;

            await dispatch(updateRole(updatedData[editingRow].id, updatedData[editingRow]));
            setEditingRow(null);
            dispatch(fetchRoles());
        } catch (error) {
            console.error('Error updating role:', error);
            // Handle error gracefully, e.g., show error message to user
        }
    };

    const handleCreate = async () => {
        try {
            const newRoleData = {
                rolename: 'New Role', // Modify as per your requirement
                // Add other necessary fields here
            };
            await dispatch(createRole(newRoleData));
            dispatch(fetchRoles());
        } catch (error) {
            console.error('Error creating role:', error);
            // Handle error gracefully, e.g., show error message to user
        }
    };

    const handleEditIconClick = () => {
        if (selectedRows.length === 1) {
            const selectedIndex = filteredData.findIndex(item => item.id === selectedRows[0]);
            if (selectedIndex !== -1) {
                handleEdit(selectedIndex);
            }
        }
    };

    const handleSearchChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchValue(inputValue);
        setIsFiltered(inputValue !== "");
    
        const filteredRoles = roles.filter(
            (role) =>
                role.rolename &&
                role.rolename.toLowerCase().includes(inputValue)
        );
    
        setFilteredData(filteredRoles);
    };
    

    const clearFilter = () => {
        setSearchValue("");
        setIsFiltered(false);
        setFilteredData(roles);
    };

    const handleCellClick = (e, item) => {
        navigate("/rolesManagement/RoleOverview", { state: { roleData: item } });
    };

    const handleMoreOptions = () => {
        // Implement more options functionality if needed
    };

    return (
        <div className="mb-5 mx-2">
            <TitleActionBar
                Title={"Roles List"}
                PlusAction={handleCreate}
                SaveAction={handleSave}
                DeleteAction={() => handleDelete(selectedRows)}
                MoreOptionsAction={handleMoreOptions}
                EditAction={handleEditIconClick}
                SaveIcon={<FontAwesomeIcon icon={faSave} />}
                DeleteIcon={<FontAwesomeIcon icon={faTrash} />}
                MoreOptionsIcon={<FontAwesomeIcon icon={faEllipsisV} />}
                EditIcon={<FontAwesomeIcon icon={faPencilAlt} />}
            />

            <Row>
                <div className="filter-box mb-5">
                    <InputGroup className="w-25">
                        <Form.Control
                            className="bg-white form-control-filter"
                            placeholder="Search Role by role name"
                            aria-label="Search"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        {isFiltered ? (
                            <Button
                                variant="primary"
                                className="form-btn"
                                id="button-addon2"
                                onClick={clearFilter}
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                className="form-btn"
                                id="button-addon2"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        )}
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
                    {Array.isArray(filteredData) && filteredData.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="view"
                                    onChange={() =>
                                        toggleRowSelection(item.id)
                                    }
                                    checked={selectedRows.includes(
                                        item.id
                                    )}
                                />
                                <FontAwesomeIcon
                                    icon={faEllipsisH}
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                    }}
                                    onClick={(e) =>
                                        handleCellClick(e, item)
                                    }
                                />
                            </td>
                            <td>
                                {editingRow === i ? (
                                    <input
                                        type="text"
                                        value={editedRoleName}
                                        onChange={(e) =>
                                            setEditedRoleName(
                                                e.target.value
                                            )
                                        }
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
