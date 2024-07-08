import React, { useState, useEffect } from "react";
import { toastFunction } from "../../components/ToastComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import {
  fetchUserData,
  updateUserData,
  deleteUser,
} from "../../store/actions/UserActions";
import TitleActionBar from "../../components/TitleActionsBar";
import TextField from "../../components/TextField";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { toast } from "react-toastify";
import { fetchCompanies } from "../../store/actions/CompanyActions";
import { fetchRoles } from "../../store/actions/RolesAction";

const UserDetailsPage = ({ value, mode }) => {
  const userData = useSelector((state) => state.users.users);
  const id = value;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDataById = useSelector((state) => state.userById.userById);
  const [filteredUserData, setFilteredUserData] = useState({});
  const [isViewMode, setIsViewMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validate, setValidate] = useState(true);
  const [modea, setMode] = useState(mode);
  const fetchCompanyData = useSelector(
    (state) => state.getCompany.fetchCompany
  );
  const roles = useSelector((state) => state.fetchRoles.roles);

  useEffect(() => {
    dispatch(fetchUserData(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (userDataById) {
      setFilteredUserData({
        userID: userDataById.id,
        firstName: userDataById.firstName,
        lastName: userDataById.lastName,
        defaultCompany: userDataById.defaultCompany,
        designation: userDataById.designation,
        primaryRole: userDataById.primaryRole,
        email: userDataById.email,
        password: userDataById.password,
        validFrom: userDataById.validFrom,
        validTill: userDataById.validTill,
        companies: userDataById.companies,
        roles: userDataById.roles,
        imageData: userDataById.imageData,
      });

      if (modea) {
        setIsViewMode(modea === "view");
      }
    }
  }, [userDataById, modea]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "defaultCompany") {
      if (value === "label") {
        return false;
      } else {
        if (filteredUserData.companies.includes(value)) {
          setFilteredUserData((prevData) => ({
            ...prevData,
            [id]: value,
          }));
        } else {
          const updatedCompanies = [...filteredUserData.companies, value];
          setFilteredUserData((prevState) => ({
            ...prevState,
            [id]: value,
            companies: updatedCompanies,
          }));
        }
      }
    } else if (id === "primaryRole") {
      if (value === "label") {
        return false;
      } else {
        if (filteredUserData.roles.includes(value)) {
          setFilteredUserData((prevData) => ({
            ...prevData,
            [id]: value,
          }));
        } else {
          const updatedRoles = [...filteredUserData.roles, value];
          setFilteredUserData((prevState) => ({
            ...prevState,
            [id]: value,
            roles: updatedRoles,
          }));
        }
      }
    } else {
      setFilteredUserData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleCreate = () => {
    navigate("/userManagement/createUsers");
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async (id) => {
    try {
      dispatch(deleteUser(id));
      toast.success("Record successfully deleted!");
      navigate("/userManagement/Userlist");
    } catch (error) {
      toast.error("Error deleting user. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleSubmit = async () => {
    let isValid = true;
    if (
      filteredUserData.firstName &&
      filteredUserData.lastName &&
      filteredUserData.defaultCompany &&
      filteredUserData.primaryRole &&
      filteredUserData.validFrom &&
      filteredUserData.validTill
    ) {
      setValidate(true);
      setIsViewMode(true);
    } else {
      isValid = false;
      setValidate(false);
      setIsViewMode(false);
    }

    // Valid From and Valid Till validation
    const validFromDate = new Date(filteredUserData.validFrom);
    const validTillDate = new Date(filteredUserData.validTill);
    if (validTillDate <= validFromDate) {
      toastFunction("Valid Till should be later than Valid From", true);
      isValid = false;
      setIsViewMode(false);
      setValidate(false);
    }
    if (
      filteredUserData.defaultCompany === "label" ||
      filteredUserData.primaryRole === "label"
    ) {
      isValid = false;
      setIsViewMode(false);
      setValidate(false);
    }
    if (isValid) {
      try {
        const updatedUserData = {
          [id]: id,
          ...filteredUserData,
        };
        await dispatch(updateUserData(id, updatedUserData));
        dispatch(fetchUserData(id));
        setIsViewMode(true);

        setMode("view");
      } catch (error) {}
    }
  };

  return (
    <>
      <Row>
        <Col>
          <TitleActionBar
            Title={""}
            // plustDisabled={isAddDisable}
            EditAction={() => setIsViewMode(false)}
            SaveAction={handleSubmit}
            PlusAction={() => {
              handleCreate();
            }}
            DeleteAction={() => {
              handleDelete();
            }}
            saveDisabled={isViewMode}
            editDisabled={!isViewMode}
          />
          <div style={{ margin: 10, padding: 20 }}>
            <UserForm
              formData={filteredUserData}
              onChange={handleInputChange}
              editMode={!isViewMode}
              userData={userData}
              fetchCompanyData={fetchCompanyData}
              roles={roles}
              Validate={validate}
            />
          </div>
        </Col>
      </Row>
      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={
          "The selected Reservation Group will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={() => {
          confirmDelete(id);
        }}
      />
    </>
  );
};

const UserForm = ({
  formData,
  onChange,
  editMode,
  isViewMode,
  fetchCompanyData,
  roles,
  Validate,
}) => {
  return (
    <>
      {!Validate && (
        <>
          <span id="message">
            Verify that all mandatory fields are filled and ValidTill Date is
            later than ValidFrom date
          </span>
          <br></br>
        </>
      )}
      {editMode ? (
        <>
          <TextField
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={onChange}
            disabled={isViewMode}
            mandatory={true}
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={onChange}
            disabled={false}
            mandatory={true}
          />

          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={3}>
              Default Company
            </Form.Label>
            <Col md={9}>
              <Form.Select
                id="defaultCompany"
                value={formData.defaultCompany}
                onChange={onChange}
                className={`w-100 ${
                  !formData.defaultCompany ||
                  formData.defaultCompany === "label"
                    ? "mandatory-field"
                    : "bg-white"
                }`}
              >
                <option value="label">Select Company</option>
                {fetchCompanyData.map((company) => (
                  <option key={company.id} value={company.companyName}>
                    {company.companyName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <TextField
            id="designation"
            label="Designation"
            value={formData.designation}
            onChange={onChange}
            disabled={false}
            mandatory={false}
          />

          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={3}>
              Primary Role
            </Form.Label>
            <Col md={9}>
              <Form.Select
                id="primaryRole"
                value={formData.primaryRole}
                onChange={onChange}
                className={`w-100 ${
                  !formData.primaryRole || formData.primaryRole === "label"
                    ? "mandatory-field"
                    : "bg-white"
                }`}
              >
                <option value="label">Select Roles</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <TextField
            id="email"
            label="Email"
            value={formData.email}
            onChange={onChange}
            disabled={true}
            mandatory={true}
          />
          <TextField
            id="validFrom"
            label="Valid From"
            type="datetime-local"
            value={formData.validFrom}
            onChange={onChange}
            disabled={false}
            mandatory={true}
          />
          <TextField
            id="validTill"
            label="Valid Till"
            type="datetime-local"
            value={formData.validTill}
            onChange={onChange}
            disabled={false}
            mandatory={true}
          />
        </>
      ) : (
        <>
          <TextField
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="defaultCompany"
            label="Default Company"
            value={formData.defaultCompany}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="designation"
            label="Designation"
            value={formData.designation}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="primaryRole"
            label="Primary Role"
            value={formData.primaryRole}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="email"
            label="Email"
            value={formData.email}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="validFrom"
            label="Valid From"
            type="datetime-local"
            value={formData.validFrom}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="validTill"
            label="Valid Till"
            type="datetime-local"
            value={formData.validTill}
            onChange={onChange}
            disabled={true}
          />
        </>
      )}
    </>
  );
};

export default UserDetailsPage;
