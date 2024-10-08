import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchCustomersById,
  editCustomer,
  deleteCustomer,
} from "../../store/actions/CustomerActions";
import TextField from "../../components/TextField";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const CustomerOverviewGeneral = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchCustomerData = useSelector(
    (state) => state.getCustomerById.fetchCustomerId
  );

  const [recordId, setRecordId] = useState("");
  const [customerID, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [isViewMode, setIsViewMode] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);
  const mode = state ? state.mode : null;

  useEffect(() => {
    if (paramData && paramData.customerCode) {
      setRecordId(paramData.customerCode);
    }
  }, [paramData]);

  useEffect(() => {
    if (recordId) {
      setIsLoading(true);
      dispatch(fetchCustomersById(recordId));
      setIsAddDisable(localStorage.getItem("add") === "false");
      setIsEditDisable(localStorage.getItem("update") === "false");
      setIsDeleteDisable(localStorage.getItem("delete") === "false");
    }
  }, [dispatch, recordId]);

  useEffect(() => {
    if (fetchCustomerData) {
      const filterData = fetchCustomerData;
      if (filterData) {
        setId(filterData?.customerID ?? "");
        setFullName(filterData?.fullName ?? "");
        setIdentifier(filterData?.identifier ?? "");
        setAddress(filterData?.address ?? "");
        setEmail(filterData?.email ?? "");
        setContactNo(filterData?.contactNo ?? "");
        if (mode === "edit" && !isEditDisable) {
          setIsViewMode(false);
          setIsEditDisable(true);
          setIsSaveDisable(false);
        } else {
          setIsViewMode(true);

          setIsSaveDisable(true);
        }
      } else {
        setError("No customer data found");
        handleNavigate();
      }
      setIsLoading(false);
    }
  }, [fetchCustomerData, mode]);

  const handleEdit = () => {
    setIsAddDisable(true);
    setIsEditDisable(true);
    setIsDeleteDisable(true);
    setIsViewMode(false);
    setIsSaveDisable(false);
  };

  const handleSave = async () => {
    try {
      if (recordId) {
        const formData = {
          customerCode: recordId,
          customerID: customerID,
          fullName: fullName,
          identifier: identifier,
          address: address,
          email: email,
          contactNo: contactNo,
        };
        const result = await dispatch(editCustomer(recordId, formData));
        if (result.type.includes("_SUCCESS")) {
          toast.success("Data saved successfully");
          handleNavigate();
        } else {
          toast.error("Failed to save changes. Please try again.");
        }
      } else {
        toast.error("Invalid customer data or ID.");
      }
    } catch (error) {
      toast.success("Data saved successfully");
      navigate("/customerManagement/CustomerList");
    }
  };

  const confirmDelete = async () => {
    try {
      if (recordId) {
        await dispatch(deleteCustomer(recordId));
        toast.success("Customer successfully deleted");
        handleNavigate();
      } else {
        toast.error("Cannot delete. Customer ID is undefined.");
      }
    } catch (error) {
      toast.error("Failed to delete customer. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const navigateToCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };

  const handleNavigate = () => {
    navigate("/customerManagement/Customerlist");
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
                label="Customer ID :"
                disabled={true}
                value={customerID}
                maxLength={8}
              />
              <TextField
                label="Full Name"
                value={fullName}
                disabled={isViewMode}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={50}
              />
              <TextField
                label="Identifier"
                value={identifier}
                disabled={isViewMode}
                onChange={(e) => setIdentifier(e.target.value)}
                maxLength={20}
              />
              <TextField
                label="Address"
                value={address}
                disabled={isViewMode}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={50}
              />
              <TextField
                label="Email"
                value={email}
                disabled={isViewMode}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Contact No"
                value={contactNo}
                disabled={isViewMode}
                onChange={(e) => setContactNo(e.target.value)}
                maxLength={15}
              />
            </Form>
          </div>

          <DeleteConfirmModel
            show={showConfirmation}
            close={cancelDelete}
            title={"Warning"}
            message={
              "The selected Customer will be deleted. Do you wish to continue?"
            }
            type={"Yes"}
            action={confirmDelete}
          />
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default CustomerOverviewGeneral;
