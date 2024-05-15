import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  fetchUserData,
  updateUserData,
  deleteUser,
} from "../../store/actions/UserActions";
import TitleActionBar from "../../components/TitleActionsBar";

import TextField from "../../components/TextField";

import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { toast } from "react-toastify";

const UserDetailsPage = ({ value, mode }) => {
  const id = value;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.users);
  const userDataById = useSelector((state) => state.userById.userById);
  const [filteredUserData, setFilteredUserData] = useState({});

  const [isViewMode, setIsViewMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [modea, setMode] = useState(mode);

  useEffect(() => {
    setTimeout(() => fetchData(), 100);
  }, [dispatch]);
  const fetchData = async () => {
    try {
      await dispatch(fetchUserData(id));
      const user = userDataById;

      setFilteredUserData({
        userID: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        defaultCompany: user.defaultCompany,
        designation: user.designation,
        primaryRole: user.primaryRole,
        email: user.email,
        password: user.password,
        validFrom: user.validFrom,
        validTill: user.validTill,
        companies: user.companies,
        roles: user.roles,
      });

      if (modea) {
        if (modea === "edit") {
          setIsViewMode(false);
        } else if (modea === "view") {
          setIsViewMode(true);
        }
      }
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFilteredUserData({
      ...filteredUserData,
      [id]: value,
    });
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

  const confirmDelete = (id) => {
    try {
      dispatch(deleteUser(id));
      toast.success("Record Successfully deleted!");
    } catch (error) {
      toast.error("Error deleting row. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
    navigate("/userManagement/Userlist");
  };

  const handleSubmit = async () => {
    try {
      const updatedUserData = {
        id: id,
        ...filteredUserData,
      };
      await dispatch(updateUserData(id, updatedUserData));
      await dispatch(fetchUserData(id));
      setIsViewMode(true);

      setMode("view");
    } catch (error) {}
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
          />
          <div style={{ margin: 10, padding: 20 }}>
            <UserForm
              formData={filteredUserData}
              onChange={handleInputChange}
              editMode={!isViewMode}
              userData={userData}
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

const UserForm = ({ formData, onChange, editMode, isViewMode }) => {
  return (
    <>
      {editMode ? (
        <>
          <TextField
            id="firstName"
            label="First Name:"
            value={formData.firstName}
            onChange={onChange}
            disabled={isViewMode}
          />
          <TextField
            id="lastName"
            label="Last Name:"
            value={formData.lastName}
            onChange={onChange}
            disabled={false}
          />
          <TextField
            id="defaultCompany"
            label="Default Company:"
            value={formData.defaultCompany}
            onChange={onChange}
            disabled={false}
          />
          <TextField
            id="designation"
            label="Designation:"
            value={formData.designation}
            onChange={onChange}
            disabled={false}
          />
          <TextField
            id="primaryRole"
            label="Primary Role:"
            value={formData.primaryRole}
            onChange={onChange}
            disabled={false}
          />

          <TextField
            id="email"
            label="Email:"
            value={formData.email}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="validFrom"
            label="Valid From:"
            type="datetime-local"
            value={formData.validFrom}
            onChange={onChange}
            disabled={false}
          />
          <TextField
            id="validTill"
            label="Valid Till:"
            type="datetime-local"
            value={formData.validTill}
            onChange={onChange}
            disabled={false}
          />
        </>
      ) : (
        <>
          <TextField
            id="firstName"
            label="First Name:"
            value={formData.firstName}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="lastName"
            label="Last Name:"
            value={formData.lastName}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="defaultCompany"
            label="Default Company:"
            value={formData.defaultCompany}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="designation"
            label="Designation:"
            value={formData.designation}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="primaryRole"
            label="Primary Role:"
            value={formData.primaryRole}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="email"
            label="Email:"
            value={formData.email}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="validFrom"
            label="Valid From:"
            type="datetime-local"
            value={formData.validFrom}
            onChange={onChange}
            disabled={true}
          />
          <TextField
            id="validTill"
            label="Valid Till:"
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
