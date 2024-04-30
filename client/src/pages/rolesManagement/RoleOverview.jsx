import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import TextField from '../../components/TextField';
import TitleActionBar from '../../components/TitleActionsBar';
import { fetchRoles, updateRole } from '../../store/actions/RolesAction';
import { toast } from 'react-toastify';

function RoleOverview({ roles, loading, error, fetchRoles, updateRole }) {
    const navigate = useNavigate();
    const location = useLocation();
    const roleData = location.state && location.state.roleData;

    // Fetch roles when component mounts
    useEffect(() => {
        fetchRoles(); 
    }, [fetchRoles]);

     // State for editing privileges and edit mode
    const [editingPrivileges, setEditingPrivileges] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // Set editing privileges and exit edit mode when roleData changes
    useEffect(() => {
        if (roleData) {
            setEditingPrivileges([...roleData.privileges || []]);
            setIsEditing(false);
        }
    }, [roleData]);

    
    // Handle checkbox change event
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) =>
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        );
    };

     // Handle edit button click
    const handleEdit = () => {
        setIsEditing(true);
    };

     // Handle save button click
    const handleSave = async () => {
        const updatedRoleData = { ...roleData, privileges: editingPrivileges }; // Update role data with edited privileges
        const roleId = roleData.id;
        try {
             // Dispatch updateRole action to update role in Redux store
            await updateRole(roleId, updatedRoleData);  
            setIsEditing(false);
            toast.success('Role Saved successfully');
        } catch (error) {
            toast.error('Error updating role:', error);
        }
    };

   
    if (loading) return <div>Loading...</div>;   // If loading, display loading message
    if (error) return <div>Error: {error.message}</div>;    // If error, display error message

    // Define all access types
    const accessTypes = ['createAccess', 'updateAccess', 'viewAccess', 'deleteAccess'];

    return (
        <>
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
                    <TextField
                        label="Role Code:"
                        value={roleData.rolecode}
                        disabled={!isEditing}
                    />
                    <TextField
                        label="Role Name:"
                        value={roleData.rolename}
                        disabled={!isEditing}
                    />
                    <div className="mb-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Privileges</th>
                                    <th>Grant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accessTypes.map(access => (
                                    <tr key={access}>
                                        <td>{`${access.charAt(0).toUpperCase() + access.slice(1)}`}</td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={access}
                                                checked={editingPrivileges.includes(access)}
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

const mapStateToProps = (state) => ({
    roles: state.roles,
    loading: state.loading,
    error: state.error
});

const mapDispatchToProps = {
    fetchRoles,
    updateRole
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleOverview);
