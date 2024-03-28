import React, { useState, useEffect, useRef } from "react";
import {
  createCompany,
  resetManageCompanyState,
  fetchCountries,
  fetchCurrencies,
} from "../../store/actions/Action";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import CheckboxField from "../../components/CheckboxField";
import DropdownField from "../../components/DropdownField";

//import { fetchCountries } from "../../store/actions/Action";

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

  //const countries = useSelector((state) => Array.isArray(state.countries) ? state.countries : []);

  //const [selectedCountry, setSelectedCountry] = useState("");

  // const handleInputChange = (e) => {
  //   let { name, value } = e.target;
  //   setCountry({ ...country, [name]: value });
  // };

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

    if (companyCode) {
      const data = {
        companyCode: companyCode.toString(),
      };
      dispatch(createCompany(data));
    } else {
      toast.error("Please fill out the Company Code fields.");
    }
    if (companyName) {
      const data = {
        companyName: companyName,
      };
      dispatch(createCompany(data));
    } else {
      toast.error("Please fill out the Company Name fields.");
    }
    if (country) {
      const data = {
        country: country,
      };
      dispatch(createCompany(data));
    } else {
      toast.error("Please fill out the Country fields.");
    }
    if (currency) {
      const data = {
        currency: currency,
      };
      dispatch(createCompany(data));
    } else {
      toast.error("Please fill out the Currency fields.");
    }
    if (address01) {
      const data = {
        address01: address01,
      };
      dispatch(createCompany(data));
    } else {
      toast.error("Please fill out the Addreess01 fields.");
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
                className={`${companyCode ? "is-invalid" : "bg-white"}`}
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
                    value: country.id,
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
                    value: currency.id,
                  })),
                ]}
              />

              {/* <label>
              Country
              <select
                id="country"
                name="country"
                value={country}
                onChange={handleInputChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.Cname}>
                    {country.Cname}
                  </option>
                ))}
              </select>
            </label> */}

              {/* <DropdownField
  label="Country"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  options={[
    { label: "Select Country", value: "" },
    ...(Array.isArray(countries)
      ? countries.map((country) => ({
          label: country.Cname,
          value: country.id
        }))
      : []),
  ]}
/> */}

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

// import React, { useState, useEffect, useRef } from "react";
// import {
//   createCompany,
//   resetManageCompanyState,
// } from "../../store/actions/Action";
// import { fetchCountries } from "../../store/actions/Action";
// import { useDispatch, useSelector } from "react-redux";
// import FormButton from "../../components/FormButton";
// import TextField from "../../components/TextField";
// import { useNavigate } from "react-router-dom";
// import { Row, Col } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { Form } from "react-bootstrap";
// import CheckboxField from "../../components/CheckboxField";

// const CreateCompany = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const companyData = useSelector((state) => state.createCompany);
//   const countries = useSelector((state) => state.countries.countries);

//   const [companyCode, setCompanyCode] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [address01, setAddress01] = useState("");
//   const [address02, setAddress02] = useState("");
//   const [defaultCompany, setDefaultCompany] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState(""); // State to hold the selected country
//   const isValueMounted = useRef(false);

//   useEffect(() => {
//     if (!isValueMounted.current)
//       if (
//         companyData &&
//         companyData.createCompany !== null &&
//         companyData.createError === null
//       ) {
//         isValueMounted.current = true;
//         toast.success("Company created successfully");
//         setTimeout(() => {
//           dispatch(resetManageCompanyState());
//           navigate("/company/companies");
//         }, 200);
//         clearTextFields();
//       }
//   }, [dispatch, navigate, companyData, isValueMounted]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!companyCode || !companyName || !address01) {
//       toast.error("Please fill out all required fields.");
//       return;
//     }

//     const data = {
//       companyCode: companyCode.toString(),
//       companyName: companyName,
//       address01: address01,
//       country: selectedCountry, // Include the selected country in data
//     };
//     dispatch(createCompany(data));
//   };

//   useEffect(() => {
//     dispatch(fetchCountries()); // Dispatch fetchCountries action when component mounts
//   }, [dispatch]);

//   const clearTextFields = () => {
//     setCompanyCode("");
//     setCompanyName("");
//     setDescription("");
//     setAddress01("");
//     setAddress02("");
//     setDefaultCompany(false);
//     setSelectedCountry(""); // Clear selected country
//   };

//   return (
//     <>
//       <Row>
//         <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
//         <Col
//           xs={12}
//           sm={12}
//           md={8}
//           lg={8}
//           xl={8}
//           xxl={10}
//           className="body-content px-5 pt-4 pb-4 mb-5"
//         >
//           <div>
//             <h3 className="mb-5">Create Company</h3>
//             <Form onSubmit={handleSubmit}>
//               <TextField
//                 label="CompanyCode"
//                 className={`${companyCode ? "is-invalid" : "bg-white"}`}
//                 value={companyCode}
//                 onChange={(e) => setCompanyCode(e.target.value)}
//                 maxLength={8}
//               />
//               <TextField
//                 value={companyName}
//                 label="CompanyName"
//                 onChange={(e) => setCompanyName(e.target.value)}
//               />

//               <TextField
//                 value={description}
//                 label="Description"
//                 onChange={(e) => setDescription(e.target.value)}
//               />

//               <TextField
//                 value={address01}
//                 label="Address01"
//                 onChange={(e) => setAddress01(e.target.value)}
//               />

//               <TextField
//                 value={address02}
//                 label="Address02"
//                 onChange={(e) => setAddress02(e.target.value)}
//               />

//               {/* <Form.Group controlId="countryDropdown" className="mb-3">
//                 <Form.Label>Country</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={selectedCountry}
//                   onChange={(e) => setSelectedCountry(e.target.value)}
//                 >
//                   <option value="">Select Country</option>
//                   <option value="USA">United States</option>
//                   <option value="UK">United Kingdom</option>

//                 </Form.Control>
//               </Form.Group> */}

// <Form.Group controlId="countryDropdown" className="mb-3">
//   <Form.Label>Country</Form.Label>
//   <Form.Control
//     as="select"
//     value={selectedCountry}
//     onChange={(e) => setSelectedCountry(e.target.value)}
//   >
//     <option value="">Select Country</option>
//     {/* Map countries from Redux store to options */}
//     {countries.map((country) => (
//       <option key={country.id} value={country.Cname}>
//         {country.Cname}
//       </option>
//     ))}
//   </Form.Control>
// </Form.Group>

//               <CheckboxField
//                 checked={defaultCompany}
//                 onChange={(e) => setDefaultCompany(e.target.checked)}
//                 name="defaultCompany"
//                 color="primary"
//                 label="Default Company"
//               />

//               <Form.Group as={Row} className="mb-3">
//                 <Col className="d-flex justify-content-end">
//                   <FormButton
//                     type="submit"
//                     text="Create"
//                     className="form-btn"
//                     disabled={!companyCode || !companyName || !address01}
//                   />
//                 </Col>
//               </Form.Group>
//             </Form>
//           </div>
//         </Col>
//         <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
//       </Row>
//     </>
//   );
// };

// export default CreateCompany;
