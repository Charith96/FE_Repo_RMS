import React, { useState, useEffect, useRef } from "react";
import {
  createCompany,
  resetManageCompanyState,
  fetchCountries,
  fetchCurrencies,
  fetchCompanies, // Import the action to fetch companies
} from "../../store/actions/CompanyActions";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import CheckboxField from "../../components/CheckboxField";
import DropdownField from "../../components/DropdownField";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve data from the Redux store
  const companyData = useSelector((state) => state.createCompany); 
  const countries = useSelector((state) => state.countries.countries);
  const currencies = useSelector((state) => state.currencies.currencies);
  const companies = useSelector((state) => state.companies.fetchCompany); // Fetch the list of companies

  // State variables for form fields
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [countryId, setCountryId] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [address01, setAddress01] = useState("");
  const [address02, setAddress02] = useState("");
  const [defaultCompany, setDefaultCompany] = useState(false);
  const [companyCodeError, setCompanyCodeError] = useState(""); // State for Company ID error
  const buttonFlag = useState(false)?.current;
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

  // Fetch countries, currencies, and existing companies when the component mounts
  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCurrencies());
    dispatch(fetchCompanies()); // Fetch the list of companies
  }, [dispatch]);

  // Clear text fields
  const clearTextFields = () => {
    setCompanyCode("");
    setCompanyName("");
    setDescription("");
    setCountryId("");
    setCurrencyId("");
    setAddress01("");
    setAddress02("");
    setDefaultCompany(false);
    setCompanyCodeError(""); // Clear the Company ID error
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (companyCode && companyName && countryId && currencyId && address01) {
      if (isCompanyCodeUnique(companyCode)) {
        const data = {
          companyCode: companyCode.toString(),
          companyName: companyName,
          description: description,
          countryID: countryId,
          currencyID: currencyId,
          address01: address01,
          address02: address02,
          defaultCompany: defaultCompany,
        };
        dispatch(createCompany(data));
      } else {
        //setCompanyCodeError("This Company ID already exists");
        toast.error("This Company ID already exists");
      }
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  // Check if the Company ID is unique
  const isCompanyCodeUnique = (code) => {
    return !companies.some((company) => company.companyCode === code);
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
                label="Company ID"
                value={companyCode}
                onChange={(e) => {
                  setCompanyCode(e.target.value);
                  setCompanyCodeError(""); // Clear error when typing
                }}
                maxLength={8}
              />
              {companyCodeError && (
                <div className="text-danger">{companyCodeError}</div>
              )}
              {/* TextField component for Company Name */}
              <TextField
                value={companyName}
                label="Company Name"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                maxLength={50}
              />

              {/* TextField component for Description */}
              <TextField
                value={description}
                label="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                maxLength={50}
                mandatory={false} // Not mandatory field
              />

              {/* DropdownField component for Country */}
              <DropdownField
                label="Country"
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                options={[
                  { label: "Select Country", value: "" }, // Add an empty option as the default
                  ...countries.map((country) => ({
                    label: country.countryName,
                    value: country.countryID,
                  })),
                ]}
              />

              {/* DropdownField component for Currency */}
              <DropdownField
                label="Currency"
                value={currencyId}
                onChange={(e) => setCurrencyId(e.target.value)}
                options={[
                  { label: "Select Currency", value: "" }, // Add an empty option as the default
                  ...currencies.map((currency) => ({
                    label: currency.currencyName,
                    value: currency.currencyID,
                  })),
                ]}
              />

              {/* TextField component for Address01 */}
              <TextField
                value={address01}
                label="Address01"
                onChange={(e) => {
                  setAddress01(e.target.value);
                }}
                maxLength={50}
              />

              {/* TextField component for Address02 */}
              <TextField
                value={address02}
                label="Address02"
                onChange={(e) => {
                  setAddress02(e.target.value);
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
                      !countryId ||
                      !currencyId ||
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

