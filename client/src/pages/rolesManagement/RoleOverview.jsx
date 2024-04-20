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

    useEffect(() => {
        fetchRoles(); // Fetch roles when component mounts
    }, [fetchRoles]);

    const [editingPrivileges, setEditingPrivileges] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (roleData) {
            setEditingPrivileges([...roleData.privileges || []]);
            setIsEditing(false);
        }
    }, [roleData]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) =>
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        );
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const updatedRoleData = { ...roleData, privileges: editingPrivileges }; // Update with roleData
        const roleId = roleData.id; 
        try {
            await updateRole(roleId, updatedRoleData); 
            setIsEditing(false);
            toast.success('Role Saved successfully'); 
        } catch (error) {
            toast.error('Error updating role:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
                                {['createAccess', 'updateAccess', 'viewAccess', 'deleteAccess'].map(privilege => (
                                    <tr key={privilege}>
                                        <td>{`${privilege.charAt(0).toUpperCase() + privilege.slice(1)}`}</td>
                                        <td>
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
