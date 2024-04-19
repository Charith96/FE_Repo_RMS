import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { Form, Row, Col } from 'react-bootstrap'; 
import { toast } from 'react-toastify'; 
import TextField from '../../components/TextField'; 
import FormButton from '../../components/FormButton'; 
import { createRole } from '../../store/actions/RolesAction'; 

function CreateRole() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    // Initializing state variables using useState hook
    const [rolecode, setRoleCode] = useState('');
    const [rolename, setRoleName] = useState('');
    const [privileges, setPrivileges] = useState([]);

    // Event handler for role code change
    const handleRoleCodeChange = (e) => {
        setRoleCode(e.target.value);
    };

    // Event handler for role name change
    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    // Event handler for checkbox change
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setPrivileges(prevPrivileges => (
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter(item => item !== name)
        ));
    };

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Dispatching createRole action with rolecode, rolename, and privileges
            await dispatch(createRole(rolecode, rolename, privileges));
            toast.success('Role created successfully'); // Show success toast
            navigate('/rolesManagement/RoleList', { state: { roleName: rolename } }); // Navigate to RoleList page
        } catch (error) {
            console.error('Error creating role:', error);
            toast.error('Error creating role'); // Show error toast
        }
    };

    return (
        <Row>
            <h3>Create Role</h3>
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
                {/* Form for creating role */}
                <Form onSubmit={handleSubmit}>
                    {/* Text field for role code */}
                    <TextField
                        label="Role Code"
                        type="text"
                        value={rolecode}
                        onChange={handleRoleCodeChange}
                        maxLength={8}
                    />
                    {/* Text field for role name */}
                    <TextField
                        label="Role Name"
                        type="text"
                        value={rolename}
                        onChange={handleRoleNameChange}
                        maxLength={20}
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
                                            <input className="form-check-input" type="checkbox" name={privilege}
                                                checked={privileges.includes(privilege)} onChange={handleCheckboxChange} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Form group for submit button */}
                    <Form.Group as={Row} className="mb-3">
                        <Col className="d-flex justify-content-end">
                            {/* Button for submitting form */}
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
