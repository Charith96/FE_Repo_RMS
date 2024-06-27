import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import TextField from '../../components/TextField';
import TitleActionBar from '../../components/TitleActionsBar';
import { fetchRoles, updateRole } from '../../store/actions/RolesAction';
import { fetchPrivileges, fetchRolePrivileges, createRolePrivilege, deleteRolePrivilege,updateRolePrivilege } from '../../store/actions/PrivilegeActions';
import { toast } from 'react-toastify';

function RoleOverview({ privileges, loading, error }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const rolePrivileges = useSelector((state) => state.rolePrivileges.rolePrivileges);
    const roleData = location.state && location.state.roleData;
    const [isDeleteDisable, setIsDeleteDisable] = useState(true);

    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchPrivileges());
    }, [dispatch]);

    useEffect(() => {
        console.log(rolePrivileges)
    }, [rolePrivileges]);

    const [editingPrivileges, setEditingPrivileges] = useState([]);
    const [rolename, setRolename] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (roleData) {
            dispatch(fetchRolePrivileges(roleData.roleCode));
            setRolename(roleData.roleName);
            setIsEditing(false);
            console.log("privileges",roleData)
        }

    }, [roleData, dispatch]);

    useEffect(() => {
        if (rolePrivileges) {
            const privilegeIds = rolePrivileges.map(privilege => privilege.privilegeCode);
            setEditingPrivileges([...privilegeIds]);
        }
    }, [rolePrivileges]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) =>
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        );
    };

    const handleRoleNameChange = (e) => {
        setRolename(e.target.value);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedRoleData = { ...roleData, roleName: rolename };
        const roleId = roleData.roleCode;

        dispatch(updateRole(roleId, updatedRoleData))
            .then(() => {
                const currentPrivileges = rolePrivileges.map(privilege => privilege.privilegeCode);
                const newPrivileges = editingPrivileges.filter(privilegeCode => !currentPrivileges.includes(privilegeCode));
                const removedPrivileges = currentPrivileges.filter(privilegeCode => !editingPrivileges.includes(privilegeCode));

                // Add new privileges
                newPrivileges.forEach(privilegeCode => {
                    const data = {
                        roleCode:roleData.roleCode,
                        privilegeCode:privilegeCode
                    }
                    console.log(data)
                    dispatch(createRolePrivilege(data));
                });

                // Remove old privileges
                removedPrivileges.forEach(privilegeCode => {
                    const rolePrivilege = rolePrivileges.find(privilege => privilege.privilegeCode === privilegeCode);
                    if (rolePrivilege) {
                        dispatch(deleteRolePrivilege(rolePrivilege.rolePrivilegeCode));
                    }
                });

                setIsEditing(false);
                toast.success('Role saved successfully');
                 navigate("/rolesManagement/RoleList");
            })
            .catch(error => {
                toast.error('Error updating role: ' + error.message);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const accessTypes = privileges.map(privilege => ({
        id: privilege.privilegeCode,
        name: privilege.privilegeName
    }));

    return (
        <>
            <TitleActionBar
                Title={"Roles Overview"}
                EditDisabled={false}
                SaveDisabled={!isEditing}
                deleteDisabled={isDeleteDisable}
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
                        value={roleData?.roleID || ''}
                        disabled={true}
                    />
                    <TextField
                        label="Role Name:"
                        value={rolename}
                        onChange={handleRoleNameChange}
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
                                    <tr key={access.id}>
                                        <td>{access.name}</td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={access.id}
                                                checked={editingPrivileges.includes(access.id)}
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
    privileges: state.privileges.privileges,
    loading: state.loading,
    error: state.error
});

export default connect(mapStateToProps)(RoleOverview);