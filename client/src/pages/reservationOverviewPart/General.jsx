import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createCustomer } from "../../store/actions/customerActions";
import TextField from "../../components/TextField";
import FormButton from "../../components/FormButton";
import { Row, Col, Form } from "react-bootstrap";

const ItemInformation = ({ createCustomer }) => {
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
      navigate("/customerManagement/CustomerList"); // Navigate to Customer List page
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
        <form onSubmit={handleSubmit}>
          <TextField
            label="Reservation ID"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            maxLength={8}
            isMandatory={true}
          />

          <TextField
            label="Customer ID"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength={50}
            isMandatory={true}
          />
        </form>
      </Col>
    </Row>
  );
};

export default connect(null, { createCustomer })(ItemInformation);
