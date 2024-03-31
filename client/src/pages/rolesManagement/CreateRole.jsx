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

    const [errors, setErrors] = useState({
        rolecode: '',
        rolename: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
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

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = { rolecode: '', rolename: '' };

        if (!values.rolecode || values.rolecode.trim().length === 0 || values.rolecode.length > 8) {
            newErrors.rolecode = 'Role ID is mandatory and must be 8 characters or less.';
            formIsValid = false;
        }

        if (!values.rolename || values.rolename.trim().length === 0 || values.rolename.length > 20) {
            newErrors.rolename = 'Role Name is mandatory and must be 20 characters or less.';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}${ROLE_URL}`, values);
            console.log('Role created successfully:', response.data);
            navigate('/rolesManagement/RoleList');
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    const formValid = !errors.rolecode && !errors.rolename;

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
                        inputMessage={errors.rolecode}
                        maxLength={8}
                    />
                    <TextField
                        label="Role Name:"
                        name="rolename"
                        value={values.rolename}
                        onChange={handleChange}
                        inputMessage={errors.rolename}
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
                                disabled={!formValid}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

export default CreateRole;
