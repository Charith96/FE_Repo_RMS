import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import TextField from "../../components/TextField";
import FormButton from "../../components/FormButton";
import { createRole } from "../../store/actions/RolesAction";
import {
  fetchPrivileges,
  createRolePrivilege,
} from "../../store/actions/PrivilegeActions";

function CreateRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPrivileges());
  }, [dispatch]);

  const privileges = useSelector((state) => state.privileges.privileges);
  const roledata = useSelector((state) => state.createRole.roles);

  const [roleID, setRoleID] = useState("");
  const [roleName, setRoleName] = useState("");
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(roleID !== "" && roleName !== "" && selectedPrivileges.length > 0);
  }, [roleID, roleName, selectedPrivileges]);

  useEffect(() => {
    console.log(roledata)
    if (roledata !== "") {
      selectedPrivileges.forEach((element) => {
        const data = {
          roleCode: roledata[0]?.roleCode,
          privilegeCode: element,
        };
        dispatch(createRolePrivilege(data));
      });
    }
  }, [roledata]);

  const handleRoleCodeChange = (e) => {
    setRoleID(e.target.value);
  };

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedPrivileges((prevPrivileges) =>
      checked
        ? [...prevPrivileges, id]
        : prevPrivileges.filter((item) => item !== id)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(createRole(roleID, roleName));
      toast.success("Role Successfully created!");
      setTimeout(() => {
        navigate("/rolesManagement/RoleList", {
          state: { rolename: roleName },
        });
      }, 200);
    } catch (error) {
      toast.error("Error creating role");
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
            value={roleID}
            onChange={handleRoleCodeChange}
            maxLength={8}
          />
          <TextField
            label="Role Name"
            type="text"
            value={roleName}
            onChange={handleRoleNameChange}
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
                {privileges.map((privilege) => (
                  <tr key={privilege.privilegeCode}>
                    <td>{privilege.privilegeName}</td>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={privilege.privilegeCode}
                        checked={selectedPrivileges.includes(privilege.privilegeCode)}
                        onChange={handleCheckboxChange}
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "2px solid black",
                        }}
                      />
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