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

    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rolecode' && value.length <= 8) {
            setValues({ ...values, rolecode: value });
        } else if (name === 'rolename' && value.length <= 20) {
            setValues({ ...values, rolename: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios.post(`${BASE_URL}${ROLE_URL}`, values)
            .then(res => {
                console.log(res);
                navigate('/rolesManagement/RoleList', { state: { roleData: values } }); // Navigate to RoleList with roleData
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValues({
            ...values,
            privileges: checked
                ? [...values.privileges, name]
                : values.privileges.filter(item => item !== name),
        });
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
                               // disabled={!validateForm}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

export default CreateRole;
