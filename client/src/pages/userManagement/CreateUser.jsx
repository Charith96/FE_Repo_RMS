import { toastFunction } from "../../components/ToastComponent";
import { fetchCompanyData, fetchRoleData } from '../../store/actions/UserActions';
import { selectUserData } from '../../store/Store';
import React, { useState, useEffect, useRef } from "react";
import {
  createReservationGroup,
  resetManageReservationGroupState,
} from "../../store/actions/ReservationGroupActions";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { createUser } from "../../store/actions/UserActions";

const Main = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // userID: "",
    firstName: "",
    lastName: "",
    defaultCompany: "",
    designation: "",
    primaryRole: "",
    email: "",
    password: "",
    validFrom: "",
    validTill: "",
  });

  useEffect(() => {
    dispatch(fetchCompanyData());
    dispatch(fetchRoleData());
  }, []);
  const validateForm = () => {
    const {
      // userId,
      firstName,
      lastName,
      defaultCompany,
      designation,
      primaryRole,
      email,
      password,
      validFrom,
      validTill,
    } = formData;

    // Field validation
    if (
      !firstName ||
      !lastName ||
      !designation ||
      !email ||
      !validFrom ||
      !validTill
    ) {
      toastFunction("All fields are required", true);
      console.log(formData);
      return false;
    }

    // User ID validation
    // if (userId.length < 8) {
    //   toastFunction("User ID must be at least 8 characters long", true);
    //   return false;
    // }

  

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toastFunction(
        "Password must be at least 8 characters long and contain at least one number, and one special character",
        true
      );
      return false;
    }

    // Valid From and Valid Till validation
    const validFromDate = new Date(validFrom);
    const validTillDate = new Date(validTill);
    if (validTillDate <= validFromDate) {
      toastFunction("Valid Till should be later than Valid From", true);
      return false;
    }

    return true;
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    console.log(e);
    console.log("Value:", value);
    if (id === "defaultCompany" ) {
    
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        companies: prevState.companies ? [...prevState.companies, value] : [value]
      }));
    } else if (id === "primaryRole") {

      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        roles: prevState.roles ? [...prevState.roles, value] : [value]
      }));
    } else  if (id === "email") {

      // If it's the email field, update both email and userID with the same value
      setFormData((prevState) => ({
        ...prevState,
        email: value,
        userID: value,
      }));
    } else {
   
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(createUser(formData));
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      toastFunction("Something went wrong!", true);
    }
    setFormSubmitted(true);
  };

  return (
    <>
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
            <h3 className="mb-5">Create Users</h3>
            <Form onSubmit={handleSubmit}>
              {/* <TextField
                id="userID"
                label="User ID:"
                onChange={handleInputChange}
                value={formData.userID}
                disabled={true}
                type="email"
              /> */}
             <TextField
  id="firstName"
  label="First Name:"
  onChange={handleInputChange}
  type="text"
/>
<TextField
  id="lastName" 
  label="Last Name:"
  onChange={handleInputChange}
  type="text"
/>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>
                  Default Company
                </Form.Label>
                <Col md={9}>
                  <Form.Select
                    id="defaultCompany"
                    value={formData.defaultCompany}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Default Company</option>
                    {userData.company.map((company) => (
                      <option key={company.id} value={company.name}>
                        {company.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <TextField
                  id="designation"
                  type="text"
                  label="Designation:"
                  onChange={handleInputChange}
                  maxlength={40} 
                />
              
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>
                  Default Role
                </Form.Label>
                <Col md={9}>
                  <Form.Select
                    id="primaryRole"
                    value={formData.primaryRole}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Default Company</option>
                    {userData.roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <TextField
  id="email"
  type="email"
  label="Email:"
  onChange={handleInputChange}
  maxlength={50} 
/>

                <TextField
                  id="password"
                  type="password"
                  label="Password:"
                  onChange={handleInputChange}
                />
                <TextField
                  id="validFrom"
                  type="datetime-local"
                  label="Valid From:"
                  onChange={handleInputChange}
                />
                <TextField
                  id="validTill"
                  type="datetime-local"
                  label="Valid Till:"
                  onChange={handleInputChange}
           
                />
              <Form.Group as={Row} className="mb-3">
                <Col className="d-flex justify-content-end">
                  <FormButton
                    type="submit"
                    text="Create"
                    className="form-btn"
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default Main;
