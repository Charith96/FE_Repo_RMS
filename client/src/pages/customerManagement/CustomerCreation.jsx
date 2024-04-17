import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createCustomer } from "../../store/actions/customerActions";
import TextField from "../../components/TextField";
import FormButton from "../../components/FormButton";
import { Row, Col, Form } from "react-bootstrap";

const CustomerCreation = ({ createCustomer }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const isValidEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);
    };

    const mandatoryFieldsFilled =
      id.trim() !== "" &&
      fullName.trim() !== "" &&
      identifier.trim() !== "" &&
      address.trim() !== "" &&
      contactNo.trim() !== "";

    setFormValid(mandatoryFieldsFilled && isValidEmail(email));
  }, [id, fullName, identifier, address, email, contactNo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValid) {
      alert("Please fill in all mandatory fields and provide a valid email.");
      return;
    }

    const newCustomer = {
      id,
      fullName,
      identifier,
      address,
      email,
      contactNo,
    };

    try {
      await createCustomer(newCustomer);
      navigate("/customerManagement/CustomerList"); 
    } catch (error) {
      console.error("Error creating customer:", error);
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
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default connect(null, { createCustomer })(CustomerCreation);
