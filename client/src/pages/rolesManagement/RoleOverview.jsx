import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import TextField from '../../components/TextField'; 
import TitleActionBar from '../../components/TitleActionsBar';

function RoleOverview() {
    const location = useLocation();
    const roleData = location.state?.roleData || {};

    const [values, setValues] = useState({
        rolecode: roleData.rolecode || '',
        rolename: roleData.rolename || '',
        privileges: roleData.privileges || [],
    });

    const [editingPrivileges, setEditingPrivileges] = useState([...values.privileges]);
    const [isEditing, setIsEditing] = useState(false);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) =>
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        );
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setValues({ ...values, privileges: editingPrivileges });
        setIsEditing(false);
    };

    useEffect(() => {
        setValues({
            rolecode: roleData.rolecode || '',
            rolename: roleData.rolename || '',
            privileges: roleData.privileges || [],
        });
        setEditingPrivileges([...roleData.privileges || []]);
        setIsEditing(false);
    }, [roleData]);

    return (
        <>
        <TitleActionBar
        Title={"Roles Overview"}
        plustDisabled={true}
        editDisabled={false}
        saveDisabled={false}
        deleteDisabled={true}
        PlusAction={() => {}}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={() => {}}
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
                        value={values.rolecode}
                        disabled
                    />
                    <TextField
                        label="Role Name:"
                        value={values.rolename}
                        disabled
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
                                            <input className="form-check-input" type="checkbox" name={privilege}
                                                checked={isEditing ? editingPrivileges.includes(privilege) : values.privileges.includes(privilege)} onChange={handleCheckboxChange} style={{ width: '20px', height: '20px', border: '2px solid black' }} />
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

export default RoleOverview;
