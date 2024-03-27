import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUserAction } from '../../store/actions/RolesAction';
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

    return (
        <div className="App">
            <div className="parts">
                <div id="subTopic">
                    <h4 className="subheaderTitle">Create Role</h4>
                    <div className='content-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="rolecode">Role Code:</label>
                                <input type="text" name='rolecode' className={`form-control ${errors.rolecode ? 'is-invalid' : ''}`} placeholder='Enter Role Code'
                                    value={values.rolecode} onChange={handleChange} />
                                {errors.rolecode && <div className="invalid-feedback">{errors.rolecode}</div>}
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="rolename">Role Name:</label>
                                <input type="text" name='rolename' className={`form-control ${errors.rolename ? 'is-invalid' : ''}`} placeholder='Enter Role Name'
                                    value={values.rolename} onChange={handleChange} />
                                {errors.rolename && <div className="invalid-feedback">{errors.rolename}</div>}
                            </div>
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
                                                <td>{`${privilege.charAt(0).toUpperCase() + privilege.slice(1)} Access`}</td>
                                                <td>
                                                    <input className="form-check-input" type="checkbox" name={privilege}
                                                        checked={values.privileges.includes(privilege)} onChange={handleCheckboxChange} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <FormButton type="submit" text="Create" className="btn btn-success" /> {/* Use FormButton component */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRole;
