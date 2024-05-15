import React, { useEffect, useState } from "react";
import {
  fetchCompaniesById,
  fetchCountries,
  fetchCurrencies,
  editCompany,
} from "../../store/actions/CompanyActions";
import { deleteCompany } from "../../store/actions/CompanyActions";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/TextField";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import CheckboxField from "../../components/CheckboxField";
import DropdownField from "../../components/DropdownField";

const CompanyOverview = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Retrieve data from the Redux store
    const fetchCompanyData = useSelector(
      (state) => state.getCompanyById.fetchCompanyId
    );
    const editFlagData = useSelector(
      (state) => state.editCompanyFlag.editCompanyFlag
    );
    const dataForSearch = useSelector((state) => state.getCompany.fetchCompany);
    const [recordId, setRecordId] = useState(""); // State for storing the record ID
  
    const countries = useSelector((state) => state.countries.countries);
    const currencies = useSelector((state) => state.currencies.currencies);
  
    // State variables for form fields
    const [companyCode, setCompanyCode] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [address01, setAddress01] = useState("");
    const [address02, setAddress02] = useState("");
    const [defaultCompany, setDefaultCompany] = useState(false);
  
    // State variables for controlling the UI
    const [isViewMode, setIsViewMode] = useState(false);
    const [isAddDisable, setIsAddDisable] = useState(false);
    const [isEditDisable, setIsEditDisable] = useState(true);
    const [isSaveDisable, setIsSaveDisable] = useState(true);
    const [isDeleteDisable, setIsDeleteDisable] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [count, setCount] = useState(0); // State for keeping track of the number of times fetchData is called
  
    // Get the data and mode from the URL search params and location state
    const searchParams = new URLSearchParams(useLocation().search);
    const data = searchParams.get("data");
    const paramData = JSON.parse(data);
    const mode = state ? state.mode : null;
  
    // Fetch company data by ID when recordId changes
    useEffect(() => {
      if (paramData && recordId) {
        dispatch(fetchCompaniesById(recordId));
      }
    }, [dispatch, recordId]);
  
    // Fetch countries and currencies when the component mounts
    useEffect(() => {
      dispatch(fetchCountries());
      dispatch(fetchCurrencies());
    }, [dispatch]);
  
    // Function to fetch and populate the form fields with data
    const fetchData = () => {
      if (fetchCompanyData) {
        let filterData = fetchCompanyData;
        if (filterData) {
          if (count === 0) {
            setCompanyCode(filterData?.companyCode ?? "");
            setCompanyName(filterData?.companyName ?? "");
            setDescription(filterData?.description ?? "");
            setCountry(filterData?.country ?? "");
            setCurrency(filterData?.currency ?? "");
            setAddress01(filterData?.address01 ?? "");
            setAddress02(filterData?.address02 ?? "");
            setDefaultCompany(filterData?.defaultCompany ?? "");
            if (mode) {
              if (mode === "edit") {
                setIsViewMode(false);
                setIsEditDisable(true);
                setIsSaveDisable(false);
              } else if (mode === "view") {
                setIsViewMode(true);
                setIsEditDisable(false);
                setIsSaveDisable(true);
              }
            }
          }
        } else {
          handleNavigate();
        }
        setCount(1);
      }
    };
  
    // Set the recordId when paramData changes, and call fetchData after a delay
    useEffect(() => {
      if (paramData && paramData.id && paramData.id !== "") {
        setRecordId(paramData.id);
      }
      if (recordId) {
        setTimeout(() => fetchData(), 100);
      }
    }, [isSaveDisable, recordId, fetchData]);
  
    // Handle edit button click
    const handleEdit = () => {
      setIsAddDisable(true);
      setIsEditDisable(true);
      setIsDeleteDisable(true);
      setIsViewMode(false);
      setIsSaveDisable(false);
    };
  
    // Handle save button click
    const handleSave = async () => {
      try {
        if (paramData && recordId) {
          const formData = {
            id: recordId,
            companyCode: companyCode,
            companyName: companyName,
            description: description,
            country: country,
            currency: currency,
            address01: address01,
            address02: address02,
            defaultCompany: defaultCompany,
          };
          dispatch(editCompany(recordId, formData));
          handleNavigate();
          toast.success("Data saved successfully");
        } else {
          toast.error("Failed to save changes. Please try again.");
        }
      } catch (error) {
        toast.error("Error saving data. Please try again.");
      }
    };
  
    // Confirm delete action
    const confirmDelete = async () => {
      try {
        if (paramData && paramData.id) {
          dispatch(deleteCompany(paramData.id));
          toast.success("Data deleted successfully");
          handleNavigate();
        } else {
          toast.error("Cannot delete. ID is undefined.");
        }
      } catch (error) {
        toast.error("Error deleting data. Please try again.");
      } finally {
        setShowConfirmation(false);
      }
    };
  
    // Handle delete button click
    const handleDelete = () => {
      setShowConfirmation(true);
    };
  
    // Cancel delete confirmation
    const cancelDelete = () => {
      setShowConfirmation(false);
    };
  
    // Navigate to the create company page
    const navigateToCreate = () => {
      navigate("/company/createCompany");
    };
  
    // Navigate to the companies list page
    const handleNavigate = () => {
      navigate("/company/companies");
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
          {/* TitleActionBar component with props */}
          <TitleActionBar
            Title={"Company Overview"}
            plustDisabled={isAddDisable}
            editDisabled={isEditDisable}
            saveDisabled={isSaveDisable}
            deleteDisabled={isDeleteDisable}
            PlusAction={() => {
              navigateToCreate();
            }}
            EditAction={() => {
              handleEdit();
            }}
            SaveAction={() => {
              handleSave();
            }}
            DeleteAction={() => {
              handleDelete();
            }}
          />

          <div>
            {/* Form with various fields */}
            <Form>
              <TextField
                label="Company Code"
                className={`${!companyCode ? "is-invalid" : ""}`}
                disabled={true}   //Always disable
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
              />
              <TextField
                label="Company Name"
                className={`${!companyName ? "is-invalid" : ""}`}
                value={companyName}
                disabled={isViewMode}
                onChange={(e) => {
                  setCompanyName(e.target.value)
                }}
                maxLength={50}
              />

              <TextField
                label="Description"
                className={`${!description ? "is-invalid" : ""}`}
                value={description}
                disabled={isViewMode}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                maxLength={50}
                mandatory={false} // Not mandatory field
              />
              <DropdownField
                label="Country"
                className={`${!country ? "is-invalid" : ""}`}
                value={country}
                disabled={isViewMode}
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
                className={`${!currency ? "is-invalid" : ""}`}
                value={currency}
                disabled={isViewMode}
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
                label="Address01"
                className={`${!address01 ? "is-invalid" : ""}`}
                value={address01}
                disabled={isViewMode}
                onChange={(e) => {
                  setAddress01(e.target.value)
                }}
                maxLength={50}
              />

              <TextField
                label="Address02"
                className={`${!address02 ? "is-invalid" : ""}`}
                value={address02}
                disabled={isViewMode}
                onChange={(e) => {
                  setAddress02(e.target.value)
                }}
                maxLength={50}
                mandatory={false} // Not mandatory field
              />

              <CheckboxField
                checked={defaultCompany}
                onChange={(e) => setDefaultCompany(e.target.checked)}
                name="defaultCompany"
                color="primary"
                className={`${!defaultCompany ? "is-invalid" : ""}`}
                disabled={isViewMode}
                label="Default Company"
              />
            </Form>
          </div>

          {/* DeleteConfirmModel component for delete confirmation */}
          <DeleteConfirmModel
            show={showConfirmation}
            close={cancelDelete}
            title={"Warning"}
            message={
              "The selected Company will be deleted. Do you wish to continue?"
            }
            type={"Yes"}
            action={() => {
              confirmDelete();
            }}
          />
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};
export default CompanyOverview;
