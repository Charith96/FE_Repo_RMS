import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createCustomer } from "../../store/actions/customerActions";
import TextField from "../../components/TextField"; 
import FormButton from "../../components/FormButton";
import { Row, Col, Form } from "react-bootstrap";

// Functional component for creating a new customer
const CustomerCreation = ({ createCustomer }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [id, setId] = useState(""); // State for customer ID
  const [fullName, setFullName] = useState(""); // State for full name
  const [identifier, setIdentifier] = useState(""); // State for identifier
  const [address, setAddress] = useState(""); // State for address
  const [email, setEmail] = useState(""); // State for email
  const [contactNo, setContactNo] = useState(""); // State for contact number
  const [formValid, setFormValid] = useState(false); // State for form validity

  // useEffect hook to validate form fields whenever any of them changes
  useEffect(() => {
    // Function to check if an email is valid
    const isValidEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);
    };

    // Checking if all mandatory fields are filled
    const mandatoryFieldsFilled =
      id.trim() !== "" &&
      fullName.trim() !== "" &&
      identifier.trim() !== "" &&
      address.trim() !== "" &&
      contactNo.trim() !== "";

    // Setting form validity based on mandatory fields and email validity
    setFormValid(mandatoryFieldsFilled && isValidEmail(email));
  }, [id, fullName, identifier, address, email, contactNo]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Preventing default form submission behavior

    // If form is not valid, alert the user and return
    if (!formValid) {
      alert("Please fill in all mandatory fields and provide a valid email.");
      return;
    }

    // Creating a new customer object
    const newCustomer = {
      id,
      fullName,
      identifier,
      address,
      email,
      contactNo,
    };

    try {
      // Dispatching action to create a new customer
      await createCustomer(newCustomer);
      navigate("/customerManagement/CustomerList"); // Navigating to customer list page after successful creation
    } catch (error) {
      console.error("Error creating customer:", error); // Logging error if customer creation fails
    }
  };

  return (
    <Row>
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
          <h4>Customer Creation</h4>
        </div>

        <form onSubmit={handleSubmit}>
          {/* TextField components for various input fields */}
          <TextField
            label="Customer ID"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            maxLength={8}
            isMandatory={true} // Indicating that this field is mandatory
          />

          <TextField
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength={50}
            isMandatory={true}
          />

          <TextField
            label="Identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            maxLength={20}
            isMandatory={true}
          />

          <TextField
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            maxLength={50}
            isMandatory={true}
          />

          <TextField
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Contact No"
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            maxLength={15}
            isMandatory={true}
          />

          {/* Submit button */}
          <div>
            <Form.Group as={Row} className="mb-3">
              <Col className="d-flex justify-content-end">
                <FormButton
                  type="submit"
                  text="Create"
                  className="form-btn"
                  disabled={!formValid} // Disabling the button if form is not valid
                />
              </Col>
            </Form.Group>
          </div>
        </form>
      </Col>
    </Row>
  );
};

// Connecting the component to Redux store and mapping dispatch to props
export default connect(null, { createCustomer })(CustomerCreation);
