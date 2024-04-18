import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import TextField from '../../components/TextField';
import TitleActionBar from '../../components/TitleActionsBar';
import { updateRole } from '../../store/actions/RolesAction';

function RoleOverview() {
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
        const updatedRoleData = { ...values, privileges: editingPrivileges };
        const roleId = roleData.id; // Assuming there is a property `id` in `roleData` that holds the role ID
        try {
            await updateRoleAsync(roleId, updatedRoleData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    // Async/await-based API calling function
    const updateRoleAsync = async (roleId, updatedRoleData) => {
        try {
            await updateRole(roleId, updatedRoleData);
        } catch (error) {
            throw error;
        }
    };

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
                        value={values.rolecode}
                        disabled={!isEditing}
                    />
                    <TextField
                        label="Role Name:"
                        value={values.rolename}
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

export default RoleOverview;
