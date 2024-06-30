import React, { useEffect, useState } from "react";
import {
  fetchCompaniesById,
  fetchCountries,
  fetchCurrencies,
  editCompany,
  deleteCompany
} from "../../store/actions/CompanyActions";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/TextField";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
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
  const countries = useSelector((state) => state.countries.countries);
  const currencies = useSelector((state) => state.currencies.currencies);

  // State variables for form fields
  const [recordId, setRecordId] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [countryId, setCountryId] = useState("");
  const [currencyId, setCurrencyId] = useState("");
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the data and mode from the URL search params and location state
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);
  const mode = state ? state.mode : null;

  // Fetch company data by ID when recordId changes
  useEffect(() => {
    if (recordId) {
      dispatch(fetchCompaniesById(recordId));
    }
  }, [dispatch, recordId]);

  // Fetch countries and currencies when the component mounts
  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCurrencies());
  }, [dispatch]);

  // Set the recordId when paramData changes
  useEffect(() => {
    if (paramData && paramData.companyID && paramData.companyID !== "") {
      setRecordId(paramData.companyID);
    }
  }, [paramData]);

  // Function to fetch and populate the form fields with data
  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    if (fetchCompanyData) {
      let filterData = fetchCompanyData;
      if (filterData) {
        setCompanyCode(filterData?.companyCode ?? "");
        setCompanyName(filterData?.companyName ?? "");
        setDescription(filterData?.description ?? "");
        setCountryId(filterData?.countryID ?? "");
        setCurrencyId(filterData?.currencyID ?? "");
        setAddress01(filterData?.address01 ?? "");
        setAddress02(filterData?.address02 ?? "");
        setDefaultCompany(filterData?.defaultCompany ?? false);
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
      } else {
        setError("No company data found");
        handleNavigate();
      }
    } else {
      setError("Failed to fetch company data");
    }
    setIsLoading(false);
  };

  // Call fetchData when fetchCompanyData changes
  useEffect(() => {
    if (fetchCompanyData) {
      fetchData();
    }
  }, [fetchCompanyData]);

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
          companyID: recordId,
          companyCode: companyCode,
          companyName: companyName,
          description: description,
          countryID: countryId,
          currencyID: currencyId,
          address01: address01,
          address02: address02,
          defaultCompany: defaultCompany,
        };
        const result = await dispatch(editCompany(recordId, formData));
        if (result.type.includes("_SUCCESS")) {
          toast.success("Data saved successfully");
          handleNavigate();
        } else {
          toast.error("Failed to save changes. Please try again.");
        }
      } else {
        toast.error("Invalid company data or ID.");
      }
    } catch (error) {
      toast.error("Error saving data. Please try again.");
    }
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (paramData && paramData.companyID) {
      try {
        // Attempt to delete the company
        await dispatch(deleteCompany(paramData.companyID));
        
        // If we reach here, it means the deletion was successful
        toast.success("Company successfully deleted");
        handleNavigate();
      } catch (error) {
        // Check if the error is due to associated users
        if (error.response && error.response.data === "Cannot delete company with associated users.") {
          toast.error("Cannot delete company with associated users.");
        } else {
          // For other errors, show a generic error message
          toast.error("Error deleting company. Please try again.");
        }
        console.error("Delete error:", error);
      } finally {
        // Close the confirmation dialog
        setShowConfirmation(false);
      }
    } else {
      toast.error("Cannot delete. Company ID is undefined.");
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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

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
          <TitleActionBar
            Title={"Company Overview"}
            plustDisabled={isAddDisable}
            editDisabled={isEditDisable}
            saveDisabled={isSaveDisable}
            deleteDisabled={isDeleteDisable}
            PlusAction={navigateToCreate}
            EditAction={handleEdit}
            SaveAction={handleSave}
            DeleteAction={handleDelete}
          />

          <div>
            <Form>
              <TextField
                label="Company ID"
                className={`${!companyCode ? "is-invalid" : ""}`}
                disabled={true}
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
              />
              <TextField
                label="Company Name"
                className={`${!companyName ? "is-invalid" : ""}`}
                value={companyName}
                disabled={isViewMode}
                onChange={(e) => setCompanyName(e.target.value)}
                maxLength={50}
              />
              <TextField
                label="Description"
                className={`${!description ? "is-invalid" : ""}`}
                value={description}
                disabled={isViewMode}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={50}
                mandatory={false}
              />
              <DropdownField
                label="Country"
                className={`${!countryId ? "is-invalid" : ""}`}
                value={countryId}
                disabled={isViewMode}
                onChange={(e) => setCountryId(e.target.value)}
                options={[
                  { label: "Select Country", value: "" },
                  ...countries.map((country) => ({
                    label: country.countryName,
                    value: country.countryID,
                  })),
                ]}
              />
              <DropdownField
                label="Currency"
                className={`${!currencyId ? "is-invalid" : ""}`}
                value={currencyId}
                disabled={isViewMode}
                onChange={(e) => setCurrencyId(e.target.value)}
                options={[
                  { label: "Select Currency", value: "" },
                  ...currencies.map((currency) => ({
                    label: currency.currencyName,
                    value: currency.currencyID,
                  })),
                ]}
              />
              <TextField
                label="Address01"
                className={`${!address01 ? "is-invalid" : ""}`}
                value={address01}
                disabled={isViewMode}
                onChange={(e) => setAddress01(e.target.value)}
                maxLength={50}
              />
              <TextField
                label="Address02"
                className={`${!address02 ? "is-invalid" : ""}`}
                value={address02}
                disabled={isViewMode}
                onChange={(e) => setAddress02(e.target.value)}
                maxLength={50}
                mandatory={false}
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

          <DeleteConfirmModel
            show={showConfirmation}
            close={cancelDelete}
            title={"Warning"}
            message={"The selected Company will be deleted. Do you wish to continue?"}
            type={"Yes"}
            action={confirmDelete}
          />
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default CompanyOverview;


