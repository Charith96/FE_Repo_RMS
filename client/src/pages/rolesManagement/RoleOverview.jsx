import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateRole } from '../../store/actions/RolesAction';

function RoleOverview({ roleData }) {
    const dispatch = useDispatch();

    const [editingPrivileges, setEditingPrivileges] = useState([...roleData.privileges]);
    const [isEditing, setIsEditing] = useState(false);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditingPrivileges((prevPrivileges) => (
            checked
                ? [...prevPrivileges, name]
                : prevPrivileges.filter((item) => item !== name)
        ));
    };

    const handleSave = () => {
        dispatch(updateRole(roleData.id, { privileges: editingPrivileges }));
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Role Overview</h1>
            <h2>{roleData.rolename}</h2>
            <div>
                {isEditing ? (
                    <>
                        <label>
                            <input type="checkbox" name="createAccess" checked={editingPrivileges.includes("createAccess")} onChange={handleCheckboxChange} />
                            Create Access
                        </label>
                        <label>
                            <input type="checkbox" name="updateAccess" checked={editingPrivileges.includes("updateAccess")} onChange={handleCheckboxChange} />
                            Update Access
                        </label>
                        <label>
                            <input type="checkbox" name="viewAccess" checked={editingPrivileges.includes("viewAccess")} onChange={handleCheckboxChange} />
                            View Access
                        </label>
                        <label>
                            <input type="checkbox" name="deleteAccess" checked={editingPrivileges.includes("deleteAccess")} onChange={handleCheckboxChange} />
                            Delete Access
                        </label>
                    </>
                ) : (
                    <ul>
                        {roleData.privileges.map(privilege => (
                            <li key={privilege}>{privilege}</li>
                        ))}
                    </ul>
                )}
            </div>
            {isEditing && <button onClick={handleSave}>Save</button>}
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
        </div>
    );
}

export default RoleOverview;
