import React, { useState, useEffect, useRef } from "react";
import {
  createCompany,
  resetManageCompanyState,
  fetchCountries,
  fetchCurrencies,
} from "../../store/actions/CompanyActions";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import CheckboxField from "../../components/CheckboxField";
import DropdownField from "../../components/DropdownField";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve data from the Redux store
  const companyData = useSelector((state) => state.createCompany);
  const countries = useSelector((state) => state.countries.countries);
  const currencies = useSelector((state) => state.currencies.currencies);

  // State variables for form fields
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [address01, setAddress01] = useState("");
  const [address02, setAddress02] = useState("");
  const [defaultCompany, setDefaultCompany] = useState(false);
  const [buttonFlag, setButtonFlag] = useState(false);
  const isValueMounted = useRef(false);

  // Handle successful company creation
  useEffect(() => {
    if (!isValueMounted.current)
      if (
        companyData &&
        companyData.createCompany !== null &&
        companyData.createError === null
      ) {
        isValueMounted.current = true;
        toast.success("Company created successfully");
        setTimeout(() => {
          dispatch(resetManageCompanyState());
          navigate("/company/companies");
        }, 200);
        clearTextFields();
      }
  }, [dispatch, navigate, companyData, isValueMounted]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (companyCode && companyName && country && currency && address01) {
      const data = {
        companyCode: companyCode.toString(),
        companyName: companyName,
        description: description,
        country: country,
        currency: currency,
        address01: address01,
        address02: address02,
        defaultCompany: defaultCompany,
      };
      dispatch(createCompany(data));
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  // Fetch countries and currencies when the component mounts
  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCurrencies());
  }, [dispatch]);

  // Clear text fields
  const clearTextFields = () => {
    setCompanyCode("");
    setCompanyName("");
    setDescription("");
    setCountry([]);
    setCurrency([]);
    setAddress01("");
    setAddress02("");
    setDefaultCompany(false);
  };

  return (
    <>
      <Row>
        {/* Columns for spacing */}
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
            <h3 className="mb-5">Create Company</h3>
            <Form onSubmit={handleSubmit}>
              {/* TextField component for Company Code */}
              <TextField
                label="Company Code"
                // className={`${companyCode ? "is-invalid" : "bg-white"}`}
                value={companyCode}
                onChange={(e) => {
                  setCompanyCode(e.target.value);
                }}
                maxLength={8}
              />
              {/* TextField component for Company Name */}
              <TextField
                value={companyName}
                label="Company Name"
                onChange={(e) => {
                  setCompanyName(e.target.value)
                }}
                maxLength={50}
              />

              {/* TextField component for Description */}
              <TextField
                value={description}
                label="Description"
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                maxLength={50}
                mandatory={false} // Not mandatory field
              />

              {/* DropdownField component for Country */}
              <DropdownField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                options={[
                  { label: "Select Country", value: "" }, // Add an empty option as the default
                  ...countries.map((country) => ({
                    label: country.Cname,
                    value: country.Cname,
                  })),
                ]}
              />

              {/* DropdownField component for Currency */}
              <DropdownField
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={[
                  { label: "Select Currency", value: "" }, // Add an empty option as the default
                  ...currencies.map((currency) => ({
                    label: currency.C_name,
                    value: currency.C_name,
                  })),
                ]}
              />

              {/* TextField component for Address01 */}
              <TextField
                value={address01}
                label="Address01"
                onChange={(e) => {
                  setAddress01(e.target.value)
                }}
                maxLength={50}
              />

              {/* TextField component for Address02 */}
              <TextField
                value={address02}
                label="Address02"
                onChange={(e) => {
                  setAddress02(e.target.value)
                }}
                maxLength={50}
                mandatory={false} // Not mandatory field
              />

              {/* CheckboxField component for Default Company */}
              <CheckboxField
                checked={defaultCompany}
                onChange={(e) => setDefaultCompany(e.target.checked)}
                name="defaultCompany"
                color="primary"
                label="Default Company"
              />

              {/* Form Button */}
              <Form.Group as={Row} className="mb-3">
                <Col className="d-flex justify-content-end">
                  <FormButton
                    type="submit"
                    text="Create"
                    className="form-btn"
                    disabled={
                      !companyCode ||
                      !companyName ||
                      !country ||
                      !currency ||
                      !address01 ||
                      buttonFlag
                    }
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

export default CreateCompany;
