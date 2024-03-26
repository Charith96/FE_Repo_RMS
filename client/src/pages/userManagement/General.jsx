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

const UserDetailsPage = ({value, mode}) => {
  const id  = value;
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [filteredUserData, setFilteredUserData] = useState({});
  const [filteredCompanyData, setFilteredCompanyData] = useState({});
  const [filteredRoleData, setFilteredRoleData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     if (mode && mode !== 'edit') {
    //       await dispatch(fetchUserData(id));
    //       const user = userData.users;
    //       setFilteredUserData({
    //         userID: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         defaultCompany: user.defaultCompany,
    //         designation: user.designation,
    //         primaryRole: user.primaryRole,
    //         email: user.email,
    //         password: user.password,
    //         validFrom: user.validFrom,
    //         validTill: user.validTill,
    //       });
    //     }  if (mode && mode !== 'view' && !editMode) {
    //       await dispatch(fetchUserData(id));
    //       const user = userData.users;
    //       setFilteredUserData({
    //         userID: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         defaultCompany: user.defaultCompany,
    //         designation: user.designation,
    //         primaryRole: user.primaryRole,
    //         email: user.email,
    //         password: user.password,
    //         validFrom: user.validFrom,
    //         validTill: user.validTill,
    //         companies: user.companies,
    //         roles: user.roles,
    //       });
    //       setEditMode(true); // Set editMode to true after fetching data
    //     }
  
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    const fetchData = async () => {
      try {
        if (editMode === false) {
          await dispatch(fetchUserData(id));
          setFilteredUserData({
            userID: userData.users.email,
            firstName: userData.users.firstName,
            lastName: userData.users.lastName,
            defaultCompany: userData.users.defaultCompany,
            designation: userData.users.designation,
            primaryRole: userData.users.primaryRole,
            email: userData.users.email,
            password: userData.users.password,
            validFrom: userData.users.validFrom,
            validTill: userData.users.validTill,
            companies: userData.users.companies,
            roles: userData.users.roles,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [dispatch, id, mode, userData.users]);
  
  

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
              userData={userData}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

const UserForm = ({ formData, onChange, editMode,userData }) => {

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
      {/* {editMode &&  */}
        <TextField
          id="defaultCompany"
          label="Default Company:"
          value={formData.defaultCompany}
          onChange={onChange}
          disabled={!editMode}
        />

      {/* }:{ */}
      {/* //   <Form.Group as={Row} className="mb-3">
      //   <Form.Label column md={3}>
      //     Default Company
      //   </Form.Label>
      //   <Col md={9}>
      //     <Form.Select */}
      {/* //       id="defaultCompany"
      //       value={formData.defaultCompany}
      //       onChange={onchange}
      //     >
      //       <option value="">Select Default Company</option>
      //       {userData.company.map((company) => (
      //         <option key={company.id} value={company.name}>
      //           {company.name}
      //         </option>
      //       ))}
      //     </Form.Select>
      //   </Col>
      // </Form.Group>
      }  */}
     
      <TextField
        id="designation"
        label="Designation:"
        value={formData.designation}
        onChange={onChange}
        disabled={!editMode}
      />
         {/* {editMode &&   */}
      <TextField
        id="primaryRole"
        label="Primary Role:"
        value={formData.primaryRole}
        onChange={onChange}
        disabled={!editMode}
       />
    {/* }:{ */}
      {/* //   <Form.Group as={Row} className="mb-3">
      //   <Form.Label column md={3}>
      //     Default Role
      //   </Form.Label>
      //   <Col md={9}>
      //     <Form.Select */}
      {/* //       id="primaryRole"
      //       value={formData.primaryRole}
      //       onChange={onChange}
      //     >
      //       <option value="">Select Default Company</option>
      //       {userData.company.map((role) => ( */}
      {/* //         <option key={role.id} value={role.name}>
      //           {role.name}
      //         </option>
      //       ))}
      //     </Form.Select> */}
      {/* //   </Col> */}
      {/* // </Form.Group>  */}
      {/* // } */}
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
