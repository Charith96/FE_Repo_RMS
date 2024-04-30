import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createCustomer } from "../../store/actions/customerActions";
import TextField from "../../components/TextField";
import FormButton from "../../components/FormButton";
import { Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const CustomerCreation = ({ createCustomer }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [formValid, setFormValid] = useState(false); // Indicates if the form is valid or not

  useEffect(() => {
    // Function to validate email format
    const isValidEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value); {/* Returns true if the email is valid or empty*/}
    };

    // Check whether all mandatory fields are filled and email is valid
    const mandatoryFieldsFilled =
      id.trim() !== "" &&
      fullName.trim() !== "" &&
      identifier.trim() !== "" &&
      address.trim() !== "" &&
      contactNo.trim() !== "";

    // Set form validity based on mandatory fields and email validation
    setFormValid(mandatoryFieldsFilled && isValidEmail(email));
  }, [id, fullName, identifier, address, email, contactNo]); // Re-run effect when form fields change

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCustomer = {
      id,
      fullName,
      identifier,
      address,
      email,
      contactNo,
    };

    try {
      await createCustomer(newCustomer); // Dispatch action to create new customer
      navigate("/customerManagement/CustomerList"); // Redirect to customer list page after successful creation
      toast.success("Customer created successfully");
    } catch (error) {
      toast.error("Error creating customer. Please try again."); // Notify user if an error occurs during customer creation
    }
  };

  return (
    <div className="mb-5 mx-2">
      <div>
        <h4>Customer Creation</h4>
      </div>
      <div></div>
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
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <TextField
              label="Customer ID"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              maxLength={8}
              isMandatory={true}
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

            <div>
              {/* Submit button */}
              <Form.Group as={Row} className="mb-3">
                <Col className="d-flex justify-content-end">
                  <FormButton
                    type="submit"
                    text="Create"
                    className="form-btn"
                    disabled={!formValid} // Disable button if form is invalid
                  />
                </Col>
              </Form.Group>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

// Connect component to Redux store and map dispatch to props
export default connect(null, { createCustomer })(CustomerCreation);
