import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import TextField from "../../components/TextField";
import FormButton from "../../components/FormButton";
import { fetchCustomer, updateCustomer, deleteCustomer, fetchCustomers } from "../../store/actions/customerActions";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { toast } from "react-toastify";
import { selectCustomer } from "../../store/Store";

const CustomerOverviewGeneral = ({ customer, mode }) => {
  const { customerId, fullName, identifier, address, email } = customer;
  const id = customer;
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);
 // const customer = useSelector(selectCustomer);
  const [filteredCustomerData, setFilteredCustomerData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [modea, setMode] = useState(mode);
  const [checkCustomer, setCheckCustomer] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dispatch, customer, editMode]);

  const fetchData = async () => {
    try {
      if(editMode===false){ 
        await dispatch(fetchCustomer(id));
      //  const customerData = customer.customers;
      setFilteredCustomerData({
        customerId: customer.id,
        fullName: customer.fullName,
        identifier: customer.identifier,
        address: customer.address,
        email: customer.email,
      });
      }
      if (modea) {
        if (modea === "edit") {
          setEditMode(true);
        } else if (modea === "view") {
          setIsViewMode(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setCheckCustomer(true);
    setFilteredCustomerData({
      ...filteredCustomerData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = (id) => {
    try {
      dispatch(deleteCustomer(id));
      toast.success("Record Successfully deleted!");
    } catch (error) {
      toast.error("Error deleting row. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
    navigate("/customerManagement/Customerlist");
  };

  const handleSubmit = async () => {
    try {
      const updatedCustomerData = {
        id: id,
        ...filteredCustomerData,
      };
      await dispatch(updateCustomer(id, updatedCustomerData));
      setIsViewMode(true);
      setEditMode(false);
      setMode("view");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <TitleActionBar
            Title={""}
            EditAction={() => setEditMode(true)}
            SaveAction={handleSubmit}
            PlusAction={() => handleCreate()}
            DeleteAction={() => handleDelete()}
          />
          <div style={{ margin: 10, padding: 20 }}>
            <CustomerForm
              formData={filteredCustomerData}
              onChange={handleInputChange}
              editMode={editMode}
              customers={customers}
              isViewMode={isViewMode}
            />
          </div>
        </Col>
      </Row>
      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={"The selected Reservation Group will be deleted. Do you wish to continue?"}
        type={"Yes"}
        action={() => confirmDelete(id)}
      />
    </>
  );
};

const CustomerForm = ({ formData, onChange, editMode, isViewMode }) => (
  <>
    {editMode ? (
      <>
        <TextField id="customerID" label="Customer ID :" value={formData.id} onChange={onChange} disabled={isViewMode} />
        <TextField id="fullName" label="Full Name" value={formData.fullName} onChange={onChange} disabled={isViewMode} />
        <TextField id="identifier" label="Identifier" value={formData.identifier} onChange={onChange} disabled={isViewMode} />
        <TextField id="address" label="Address" value={formData.address} onChange={onChange} disabled={isViewMode} />
        <TextField id="email" label="Email:" value={formData.email} onChange={onChange} disabled={isViewMode} />
        <TextField id="contactno" label="Contact No" value={formData.contactNo} onChange={onChange} disabled={isViewMode} />
      </>
    ) : (
      <>
        <TextField id="customerID" label="Customer ID :" value={formData.id} onChange={onChange} disabled={true} />
        <TextField id="fullName" label="Full Name" value={formData.fullName} onChange={onChange} disabled={true} />
        <TextField id="identifier" label="Identifier" value={formData.identifier} onChange={onChange} disabled={true} />
        <TextField id="address" label="Address" value={formData.address} onChange={onChange} disabled={true} />
        <TextField id="email" label="Email:" value={formData.email} onChange={onChange} disabled={true} />
        <TextField id="contactno" label="Contact No" value={formData.contactNo} onChange={onChange} disabled={true} />
      </>
    )}
  </>
);

export default CustomerOverviewGeneral;