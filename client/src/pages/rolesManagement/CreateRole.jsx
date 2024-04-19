import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import TextField from '../../components/TextField';
import FormButton from '../../components/FormButton';

import { toast } from "react-toastify";

const CreateRole = ({ createRole }) => {
    const navigate = useNavigate();

    const [rolecode, setRoleCode] = useState('');
    const [rolename, setRoleName] = useState('');
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

    /*const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await createRole(rolecode, rolename, privileges);
            console.log('Role created successfully');
            navigate('/rolesManagement/RoleList', { state: { roleName: rolename } });
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };
*/


  
     

    const handleSubmit = async (event) => {
        event.preventDefault();

        //const newRole = {
           // rolecode,
            //rolename,
          //};
      
          try {
            await createRole(rolecode, rolename, privileges);
            toast.log('Role created successfully');
            navigate('/rolesManagement/RoleList', { state: { roleName: rolename } });
          } catch (error) {
            toast.error("Error creating Role. Please try again.");
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
                <Form onSubmit={handleSubmit}>
                    <TextField
                        label="Role Code"
                        type="text"
                        value={rolecode}
                        onChange={(e) => setRoleCode(e.target.value)}
                        maxLength={8}
                        isMandatory={true}
                    />
                    <TextField
                        label="Role Name"
                        type="text"
                        value={rolename}
                        onChange={(e) => setRoleName(e.target.value)}
                        maxLength={20}
                        isMandatory={true}
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
                                            <input className="form-check-input" type="checkbox" name={privilege}
                                                checked={privileges.includes(privilege)} onChange={handleCheckboxChange} />
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