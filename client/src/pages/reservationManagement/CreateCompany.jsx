import React, { useState, useEffect, useRef } from "react";
import {
  createReservationGroup,
  resetManageReservationGroupState,
} from "../../store/actions/Action";
import { checkForDuplicate } from "../../store/actions/Action";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import CheckboxField from "../../components/CheckboxField";
import DropdownField from "../../components/DropdownField";

const CreateReservationGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDuplicated = useSelector(
    (state) => state.checkForDuplicates.checkDuplicate
  );
  const reservationGroupData = useSelector(
    (state) => state.createReservationGroup
  );
  //const [groupName, setGroupName] = useState("");
  //const [groupId, setGroupId] = useState("");
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
    if (isDuplicated) {
      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  }, [isDuplicated]);

  useEffect(() => {
    if (!isValueMounted.current)
      if (
        reservationGroupData &&
        reservationGroupData.createReservationGroup !== null &&
        reservationGroupData.createError === null
      ) {
        isValueMounted.current = true;
        toast.success("Reservation group created successfully");
        setTimeout(() => {
          dispatch(resetManageReservationGroupState());
          navigate("/reservationManagement/reservation/reservationGroups");
        }, 200);
        clearTextFields();
      }
  }, [dispatch, navigate, reservationGroupData, isValueMounted]);

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (companyCode) {
      const data = {
        companyCode: companyCode.toString(),
      };
      dispatch(createReservationGroup(data));
    } else {
      toast.error("Please fill out the Company Code fields.");
    }
    if (companyName) {
      const data = {
        companyName: companyName,
      };
      dispatch(createReservationGroup(data));
    } else {
      toast.error("Please fill out the Company Name fields.");
    }

    if (country) {
      const data = {
        country: country,
      };
      dispatch(createReservationGroup(data));
    } else {
      toast.error("Please fill out the Country fields.");
    }

    if (currency) {
      const data = {
        currency: currency,
      };
      dispatch(createReservationGroup(data));
    } else {
      toast.error("Please fill out the Currency fields.");
    }
    if (address01) {
      const data = {
        address01: address01,
      };
      dispatch(createReservationGroup(data));
    } else {
      toast.error("Please fill out the Addreess01 fields.");
    }
  };

  const clearTextFields = () => {
    setCompanyCode("");
    setCompanyName("");
    setDescription("");
    setCountry("");
    setCurrency("");
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
                className={`${
                  companyCode && isDuplicated ? "is-invalid" : "bg-white"
                }`}
                value={companyCode}
                onChange={(e) => {
                  setCompanyCode(e.target.value);
                  dispatch(checkForDuplicate(e.target.value));
                }}
                maxLength={8}
                inputMessage={"Group ID already exists"}
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
    ...country.map((country) => ({
      label: country.Cname,
      value: country.id,
    }))
        ]}
      />

<DropdownField
        label="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        options={[
          { label: "Select Currency", value: "" }, // Add an empty option as the default
          ...currency.map((currency) => ({
            label: currency.C_name,
            value: currency.id,
          }))
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

export default CreateReservationGroup;
