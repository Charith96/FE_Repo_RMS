import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRole } from '../../store/actions/RolesAction';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import TextField from '../../components/TextField';
import FormButton from '../../components/FormButton';

function CreateRole() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [roleCode, setRoleCode] = useState('');
    const [roleName, setRoleName] = useState('');
    const [privileges, setPrivileges] = useState([]);

    const handleRoleCodeChange = (e) => {
        setRoleCode(e.target.value);
    };

    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setPrivileges(prevPrivileges => (
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter(item => item !== name)
        ));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Basic validation
            if (!roleCode || !roleName) {
                console.error('Role code and role name are required.');
                return;
            }

            await dispatch(createRole({
                roleCode,
                roleName,
                privileges,
            }));
            console.log('Role created successfully');
           
            // After role creation success
            navigate('/rolesManagement/RoleList', { state: { roleName } });

        } catch (error) {
            console.error('Error creating role:', error);
            // Show error message to the user
        }
    };

    const privilegesList = ['createAccess', 'updateAccess', 'viewAccess', 'deleteAccess'];

    return (
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
                <div>
                    <h3>Create Role</h3>
                </div>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        label="Role Code"
                        type="text"
                        value={roleCode}
                        onChange={handleRoleCodeChange}
                        maxLength={8}
                    />
                    <TextField
                        label="Role Name"
                        type="text"
                        value={roleName}
                        onChange={handleRoleNameChange}
                        maxLength={20}
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
                                {privilegesList.map(privilege => (
                                    <tr key={privilege}>
                                        <td>{`${privilege.charAt(0).toUpperCase() + privilege.slice(1)}`}</td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={privilege}
                                                checked={privileges.includes(privilege)}
                                                onChange={handleCheckboxChange}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Form.Group as={Row} className="mb-3">
                        <Col className="d-flex justify-content-end">
                            <FormButton
                                type="submit"
                                text="Create"
                                className="form-btn"
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

export default CreateRole;
