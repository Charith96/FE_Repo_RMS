import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer, resetManageCustomerState, fetchCustomers } from "../../store/actions/CustomerActions";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/TextField";
import FormButton from "../../components/FormButton";
import { Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const CustomerCreation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerData = useSelector((state) => state.createCustomer);
  const fetchedCustomers = useSelector((state) => state.getCustomer.fetchCustomer);
  
  const [Customerid, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const isValueMounted = useRef(false);
  const [formValid, setFormValid] = useState(false); // Indicates if the form is valid or not

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (!isValueMounted.current && customerData.createCustomer !== null && customerData.createError === null) {
      isValueMounted.current = true;
      toast.success("Customer created successfully");
      setTimeout(() => {
        dispatch(resetManageCustomerState());
        navigate("/customerManagement/CustomerList");
      }, 200);
      clearTextFields();
    }
  }, [dispatch, navigate, customerData]);

  useEffect(() => {
    // Function to validate email format
    const isValidEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value); // Returns true if the email is valid or empty
    };

    // Check whether all mandatory fields are filled and email is valid
    const mandatoryFieldsFilled =
      Customerid.trim() !== "" &&
      fullName.trim() !== "" &&
      identifier.trim() !== "" &&
      address.trim() !== "" &&
      contactNo.trim() !== "";

    // Set form validity based on mandatory fields and email validation
    setFormValid(mandatoryFieldsFilled && isValidEmail(email));
  }, [Customerid, fullName, identifier, address, email, contactNo]); // Re-run effect when form fields change

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fetchedCustomers || fetchedCustomers.length === 0) {
      toast.error("Unable to fetch existing customers. Please try again.");
      return;
    }

    const existingCustomer = fetchedCustomers.find((customer) => customer.customerID === Customerid);
    if (existingCustomer) {
      toast.error("Customer ID already exists. Please use a different Customer ID.");
      return;
    }

    // newCustomer contains the data of the customer to be created
    if (Customerid && fullName && identifier && address && contactNo) {
      const newCustomer = {
        Customerid,
        fullName,
        identifier,
        address,
        email,
        contactNo,
      };
      dispatch(createCustomer(newCustomer));
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  const clearTextFields = () => {
    setId("");
    setFullName("");
    setIdentifier("");
    setAddress("");
    setEmail("");
    setContactNo("");
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
            <h3 className="mb-5">Create Customer</h3>
            <Form onSubmit={handleSubmit}>
              {/* Form fields */}
              <TextField
                label="Customer ID"
                value={Customerid}
                onChange={(e) => setId(e.target.value)}
                maxLength={8}
              />

              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={50}
              />

              <TextField
                label="Identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                maxLength={20}
              />

              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={50}
              />

              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mandatory={false} // Not mandatory field
              />

              <TextField
                label="Contact No"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                maxLength={15}
              />

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
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default CustomerCreation;
