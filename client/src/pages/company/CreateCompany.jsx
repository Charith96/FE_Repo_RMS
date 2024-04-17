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

  const companyData = useSelector((state) => state.createCompany);
  const countries = useSelector((state) => state.countries.countries);
  const currencies = useSelector((state) => state.currencies.currencies);

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

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCurrencies());
  }, [dispatch]);

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
              <TextField
                label="CompanyCode"
                // className={`${companyCode ? "is-invalid" : "bg-white"}`}
                value={companyCode}
                onChange={(e) => {
                  setCompanyCode(e.target.value);
                  //dispatch(checkForDuplicate(e.target.value));
                }}
                maxLength={8}
                //inputMessage={"Group ID already exists"}
              />
              <TextField
                value={companyName}
                label="CompanyName"
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <TextField
                value={description}
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              />

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

              <TextField
                value={address01}
                label="Address01"
                onChange={(e) => setAddress01(e.target.value)}
              />

              <TextField
                value={address02}
                label="Address02"
                onChange={(e) => setAddress02(e.target.value)}
              />

              <CheckboxField
                checked={defaultCompany}
                onChange={(e) => setDefaultCompany(e.target.checked)}
                name="defaultCompany"
                color="primary"
                label="Default Company"
              />

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
