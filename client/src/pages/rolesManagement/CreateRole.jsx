import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUserAction } from '../../store/actions/RolesAction';
import { Form, Row, Col } from 'react-bootstrap';
import TextField from '../../components/TextField'; 
import FormButton from '../../components/FormButton';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

function CreateRole() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(SetUserAction("grbbrtbrtrtb"));
    }, [dispatch]);

    const [values, setValues] = useState({
        rolecode: '',
        rolename: '',
        privileges: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value.trim(), // Trim any whitespace from the input
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            privileges: checked
                ? [...prevValues.privileges, name]
                : prevValues.privileges.filter(item => item !== name),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send request with values directly from state
            const response = await axios.post(`${BASE_URL}${ROLE_URL}`, values);
            console.log('Role created successfully:', response.data);
            navigate('/rolesManagement/RoleList');
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

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
                        label="Role Code:"
                        name="rolecode"
                        value={values.rolecode}
                        onChange={handleChange}
                        maxLength={8}
                    />
                    <TextField
                        label="Role Name:"
                        name="rolename"
                        value={values.rolename}
                        onChange={handleChange}
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
                                {/* Checkbox rows for privileges */}
                                {['createAccess', 'updateAccess', 'viewAccess', 'deleteAccess'].map(privilege => (
                                    <tr key={privilege}>
                                        <td>{`${privilege.charAt(0).toUpperCase() + privilege.slice(1)}`}</td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" name={privilege}
                                                checked={values.privileges.includes(privilege)} onChange={handleCheckboxChange} />
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
