import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import TextField from '../../components/TextField';
import TitleActionBar from '../../components/TitleActionsBar';
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { fetchRoles, updateRole, deleteRole } from '../../store/actions/RolesAction';
import { fetchPrivileges, fetchRolePrivileges, createRolePrivilege, deleteRolePrivilege } from '../../store/actions/PrivilegeActions';
import { toast } from 'react-toastify';

function RoleOverview({ privileges, loading, error }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const rolePrivileges = useSelector((state) => state.rolePrivileges.rolePrivileges);
    const { roleData, mode, isEditing: initialEditingState } = location.state || {};
    const [isDeleteDisable, setIsDeleteDisable] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [editingPrivileges, setEditingPrivileges] = useState([]);
    const [rolename, setRolename] = useState('');
    const [isEditing, setIsEditing] = useState(initialEditingState || false);

    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchPrivileges());
    }, [dispatch]);

    useEffect(() => {
        if (roleData) {
            dispatch(fetchRolePrivileges(roleData.roleCode));
            setRolename(roleData.roleName);
        }
    }, [roleData, dispatch]);

    useEffect(() => {
        if (rolePrivileges) {
            const privilegeIds = rolePrivileges.map(privilege => privilege.privilegeCode);
            setEditingPrivileges([...privilegeIds]);
        }
    }, [rolePrivileges]);

    const handleCheckboxChange = (e) => {
        if (!isEditing) return;
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) =>
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        );
    };

    const handleRoleNameChange = (e) => {
        if (isEditing) {
            setRolename(e.target.value);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        if (roleData) {
            dispatch(deleteRole(roleData.roleCode))
                .then(() => {
                    rolePrivileges.forEach(privilege => {
                        dispatch(deleteRolePrivilege(privilege.privilegeCode));
                    });
                    toast.success('Role deleted successfully');
                    navigate("/rolesManagement/RoleList");
                })
                .catch(error => {
                    toast.error('Error deleting role: ' + error.message);
                })
                .finally(() => {
                    setShowConfirmation(false);
                });
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleSave = () => {
        const updatedRoleData = { ...roleData, roleName: rolename };
        const roleId = roleData.roleCode;

        dispatch(updateRole(roleId, updatedRoleData))
            .then(() => {
                const currentPrivileges = rolePrivileges.map(privilege => privilege.privilegeCode);
                const newPrivileges = editingPrivileges.filter(privilegeCode => !currentPrivileges.includes(privilegeCode));
                const removedPrivileges = currentPrivileges.filter(privilegeCode => !editingPrivileges.includes(privilegeCode));

                newPrivileges.forEach(privilegeCode => {
                    const data = {
                        roleCode: roleData.roleCode,
                        privilegeCode: privilegeCode
                    }
                    dispatch(createRolePrivilege(data));
                });

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
                EditDisabled={mode === "view" || isEditing}
                SaveDisabled={!isEditing}
                deleteDisabled={false}
                PlusAction={() => navigate("/rolesManagement/CreateRole")}
                EditAction={handleEdit}
                SaveAction={handleSave}
                DeleteAction={handleDelete}
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
            <DeleteConfirmModel
                show={showConfirmation}
                close={cancelDelete}
                title={"Warning"}
                message={"The selected Role will be deleted. Do you wish to continue?"}
                type={"Yes"}
                action={confirmDelete}
            />
        </>
    );
}

const mapStateToProps = (state) => ({
    privileges: state.privileges.privileges,
    loading: state.loading,
    error: state.error
});

export default connect(mapStateToProps)(RoleOverview);