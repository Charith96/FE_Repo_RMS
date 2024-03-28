import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useDispatch } from 'react-redux';
import { SetUserAction } from '../../store/actions/RolesAction';
import FormButton from '../../components/FormButton';
import TextField from '../../components/TextField';
import { Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

function CreateRole() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [values, setValues] = useState({
        rolecode: '',
        rolename: '',
        privileges: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${BASE_URL}${ROLE_URL}`, values)
            .then(res => {
                console.log(res);
                navigate('/rolesManagement/RoleList', { state: { roleData: res.data } }); // Navigate to RoleList with roleData
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
                    <h3 className="mb-5">Create Role</h3>
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            label="Role Code:"
                            name="rolecode"
                            value={values.rolecode}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <TextField
                            label="Role Name:"
                            name="rolename"
                            value={values.rolename}
                            onChange={handleChange}
                            className="form-control"
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
                                            <td>{`${privilege.charAt(0).toUpperCase() + privilege.slice(1)} Access`}</td>
                                            <td>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name={privilege}
                                                    checked={values.privileges.includes(privilege)}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <FormButton type="submit" text="Create" className="btn btn-success" />
                    </Form>
                </div>
            </Col>
            <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
        </Row>
    );
}

export default CreateRole;
