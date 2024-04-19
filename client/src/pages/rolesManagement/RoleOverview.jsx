import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap'; 
import TextField from '../../components/TextField';
import TitleActionBar from '../../components/TitleActionsBar'; 
import { useDispatch } from 'react-redux';
import { updateRole } from '../../store/actions/RolesAction'; 
import ActionTypes from "../../data/ReduxActionTypes"; 

function RoleOverview() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const roleData = location.state && location.state.roleData;
    const [values, setValues] = useState({
        rolecode: '',
        rolename: '',
        privileges: [],
    });
    const [editingPrivileges, setEditingPrivileges] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Effect to update state when roleData changes
        if (roleData) {
            setValues({
                rolecode: roleData.rolecode || '',
                rolename: roleData.rolename || '',
                privileges: roleData.privileges || [],
            });
            setEditingPrivileges([...roleData.privileges || []]);
            setIsEditing(false);
        }
    }, [roleData]);

    // Event handler for checkbox change
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) =>
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        );
    };

    // Event handler for edit action
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Event handler for save action
    const handleSave = async () => {
        const updatedRoleData = { ...values, privileges: editingPrivileges };
        const roleId = roleData.rolecode; 
        try {
            dispatch({ type: ActionTypes.MANAGE_ROLE_START }); // Dispatching action to indicate start of role management
            const response = await updateRole(roleId, updatedRoleData); // Updating role
            console.log('Response:', response); // Logging response for debugging
            if (response.status === 200) {
                dispatch({ type: ActionTypes.UPDATE_ROLE_SUCCESS, payload: response.data }); // Dispatching action for successful role update
                setIsEditing(false); // Disabling edit mode
            }
        } catch (error) {
            dispatch({ type: ActionTypes.UPDATE_ROLE_FAILURE, payload: error }); // Dispatching action for failed role update
            console.error('Error updating role:', error);
        }
    };

    return (
        <>
            {/* TitleActionBar component for displaying title and actions */}
            <TitleActionBar
                Title={"Roles Overview"}
                EditDisabled={false}
                SaveDisabled={!isEditing}
                DeleteDisabled={true}
                PlusAction={() => navigate("/rolesManagement/CreateRole")} 
                EditAction={handleEdit} 
                SaveAction={handleSave} 
                DeleteAction={() => { }} 
            />
            <Row>
                <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
                <Col
                    xs={12}
                    sm={12}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={10}
                    className="body-content px-5 pt-4 pb-4 mb-5"
                >
                    {/* TextField for displaying role code */}
                    <TextField
                        label="Role Code:"
                        value={values.rolecode}
                        disabled={!isEditing}
                    />
                    {/* TextField for displaying role name */}
                    <TextField
                        label="Role Name:"
                        value={values.rolename}
                        disabled={!isEditing}
                    />
                    <div className="mb-3">
                        {/* Table for displaying privileges */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Privileges</th>
                                    <th>Grant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mapping through privileges and rendering checkboxes */}
                                {['createAccess', 'updateAccess', 'viewAccess', 'deleteAccess'].map(privilege => (
                                    <tr key={privilege}>
                                        <td>{`${privilege.charAt(0).toUpperCase() + privilege.slice(1)}`}</td>
                                        <td>
                                            {/* Checkbox for each privilege */}
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={privilege}
                                                checked={editingPrivileges.includes(privilege)}
                                                onChange={handleCheckboxChange}
                                                style={{ width: '20px', height: '20px', border: '2px solid black' }}
                                                disabled={!isEditing}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default RoleOverview;
