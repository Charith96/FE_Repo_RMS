import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { fetchUserData,  updateUserData, } from "../../store/actions/UserActions";
import TitleActionBar from "../../components/TitleActionsBar";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import Dropdown from "../../components/dropdown";
import { toast } from "react-toastify";
import { selectUserData } from "../../store/Store";

const UserDetailsPage = () => {
  const id  = "5e5a";
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [filteredUserData, setFilteredUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (!editMode) {
          await dispatch(fetchUserData(id));
          const user = userData.users;
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
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, id, editMode, userData.users]);

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

  const handleDelete = () => {
    setShowConfirmation(true);
  };



  const handleSubmit = async () => {
  
      try {
        const updatedUserData = {
          id: id,
          ...filteredUserData,
          userID: userData.email,
        };
        await dispatch(updateUserData(id, updatedUserData));

        setEditMode(false);
      } catch (error) {
        console.error("Error saving data:", error);
      
    } 
  };

  return (
    <>
      <Row>
        <Col>
          <TitleActionBar
            Title={""}
            // plustDisabled={isAddDisable}
            EditAction={() => setEditMode(true)}
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
              editMode={editMode}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

const UserForm = ({ formData, onChange, editMode }) => {
  return (
  <>
      <TextField
        id="firstName"
        label="First Name:"
        value={formData.firstName}
        onChange={onChange}
        disabled={!editMode}
      />
      <TextField
        id="lastName"
        label="Last Name:"
        value={formData.lastName}
        onChange={onChange}
        disabled={!editMode}
      />
      <TextField
        id="defaultCompany"
        label="Default Company:"
        value={formData.defaultCompany}
        onChange={onChange}
        disabled={!editMode}
      />
      <TextField
        id="designation"
        label="Designation:"
        value={formData.designation}
        onChange={onChange}
        disabled={!editMode}
      />
      <TextField
        id="primaryRole"
        label="Primary Role:"
        value={formData.primaryRole}
        onChange={onChange}
        disabled={!editMode}
      />
      <TextField
        id="email"
        label="Email:"
        value={formData.email}
        onChange={onChange}
        disabled={!editMode}
      />
      <TextField
        id="validFrom"
        label="Valid From:"
        type="datetime-local"
        value={formData.validFrom}
        onChange={onChange}
        disabled={!editMode}
      />
      <TextField
        id="validTill"
        label="Valid Till:"
        type="datetime-local"
        value={formData.validTill}
        onChange={onChange}
        disabled={!editMode}
      />
      {editMode && (
        <Form.Group as={Row} className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormButton type="submit" text="Save" className="form-btn" />
          </Col>
        </Form.Group>
      )}
</>
  );
};

export default UserDetailsPage;
