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
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const CustomerOverviewGeneral = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchCustomerData = useSelector(
    (state) => state.getCustomerById.fetchCustomerId
  );
  const dataForSearch = useSelector((state) => state.getCustomer.fetchCustomer);
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [count, setCount] = useState(0);
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);
  const mode = state ? state.mode : null;

  useEffect(() => {
    if (paramData && recordId) {
      dispatch(fetchCustomersById(recordId));
    }
  }, [dispatch, recordId]);

  const fetchData = () => {
    if (fetchCustomerData) {
      let filterData = fetchCustomerData;
      if (filterData) {
        if (count === 0) {
          setId(filterData?.customerID ?? "");
          setFullName(filterData?.fullName ?? "");
          setIdentifier(filterData?.identifier ?? "");
          setAddress(filterData?.address ?? "");
          setEmail(filterData?.email ?? "");
          setContactNo(filterData?.contactNo ?? "");
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

  useEffect(() => {
    if (paramData && paramData.customerCode && paramData.customerCode !== "") {
      setRecordId(paramData.customerCode);
    }
    if (recordId) {
      setTimeout(() => fetchData(), 100);
    }
  }, [isSaveDisable, recordId, fetchData]);

  const handleEdit = () => {
    setIsAddDisable(true);
    setIsEditDisable(true);
    setIsDeleteDisable(true);
    setIsViewMode(false);
    setIsSaveDisable(false);
  };

  const handleSave = async () => {
    try {
      if (paramData && recordId) {
        const formData = {
          customerCode: recordId,
          customerID: customerID,
          fullName: fullName,
          identifier: identifier,
          address: address,
          email: email,
          contactNo: contactNo,
        };
        dispatch(editCustomer(recordId, formData));
        handleNavigate();
        toast.success("Data saved successfully");
      } else {
        // Handle the case where saving failed
        toast.error("Failed to save changes. Please try again.");
      }
    } catch (error) {
      toast.error("Error saving data. Please try again.");
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  // Function to handle creating a new customer(Plus icon)
  const navigateToCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };

  const handleNavigate = () => {
    navigate("/customerManagement/Customerlist");
  };

  // Function to handle deleting a customer
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  // Function to confirm and delete a customer
  const confirmDelete = () => {
    try {
      dispatch(deleteCustomer(recordId));
      toast.success("Record Successfully deleted!");
    } catch (error) {
      toast.error("Error deleting row. Please try again.");
    } finally {
      setShowConfirmation(false);
      navigate("/customerManagement/Customerlist");
    }
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
          <TitleActionBar
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
            <Form>
              <TextField
                label="Customer ID :"
                disabled={true}
                value={customerID}
              />
              <TextField
                label="Full Name"
                value={fullName}
                disabled={isViewMode}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                label="Identifier"
                value={identifier}
                disabled={isViewMode}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <TextField
                label="Address"
                value={address}
                disabled={isViewMode}
                onChange={(e) => setAddress(e.target.value)}
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
export default CustomerOverviewGeneral;
