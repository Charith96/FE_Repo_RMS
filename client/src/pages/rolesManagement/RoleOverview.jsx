import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd'; // Assuming you're using Ant Design
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

    // Define variables/functions or import them from the appropriate location
    const isAddDisable = false; // Example value, replace with your logic
    const isEditDisable = false; // Example value, replace with your logic
    const isSaveDisable = false; // Example value, replace with your logic
    const isDeleteDisable = false; // Example value, replace with your logic

    const navigateToCreate = () => {
        // Implementation of navigateToCreate function
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setValues({ ...values, privileges: editingPrivileges });
        setIsEditing(false);
    };

    const handleDelete = () => {
        // Implementation of handleDelete function
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) =>
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        );
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
                {/* TitleActionBar component */}
                <TitleActionBar
                    Title={"Reservation Group Overview"}
                    plustDisabled={isAddDisable}
                    editDisabled={isEditDisable}
                    saveDisabled={isSaveDisable}
                    deleteDisabled={isDeleteDisable}
                    PlusAction={navigateToCreate}
                    EditAction={handleEdit}
                    SaveAction={handleSave}
                    DeleteAction={handleDelete}
                />
                <div>
           
             
                    <div>
                        <div>
                            <label htmlFor="rolecode">Role Code:</label>
                            <input type="text" name='rolecode' value={values.rolecode} readOnly />
                        </div>
                        <div>
                            <label htmlFor="rolename">Role Name:</label>
                            <input type="text" name='rolename' value={values.rolename} readOnly />
                        </div>
                        <div>
                            <table>
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
                                                <input type="checkbox" name={privilege}
                                                    checked={isEditing ? editingPrivileges.includes(privilege) : values.privileges.includes(privilege)} onChange={handleCheckboxChange} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default RoleOverview;
