import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../store/actions/customerActions";
import { Container, Row, Col, Form } from "react-bootstrap";
import TextField from "../../components/TextField";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { toast } from "react-toastify";

const CustomerOverviewGeneral = ({ customer, mode }) => {
  const { id, fullName, identifier, address, email } = customer;
  const dispatch = useDispatch();
  const [filteredCustomerData, setFilteredCustomerData] = useState({
    ...customer,
  });
  const [editMode, setEditMode] = useState(mode === "edit");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!editMode) {
      fetchCustomerData();
    }
  }, []);

  const fetchCustomerData = async () => {
    try {
      await dispatch(fetchCustomer(id));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    try {
      dispatch(deleteCustomer(id));
      toast.success("Record Successfully deleted!");
    } catch (error) {
      toast.error("Error deleting row. Please try again.");
    } finally {
      setShowConfirmation(false);
      navigate("/customerManagement/Customerlist");
    }
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateCustomer(id, filteredCustomerData));
      setEditMode(false);
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
            DeleteAction={handleDelete}
            SaveAction={handleSubmit}
          />
          <div style={{ margin: 10, padding: 20 }}>
            <CustomerForm
              formData={filteredCustomerData}
              setFormData={setFilteredCustomerData}
              editMode={editMode}
            />
          </div>
        </Col>
      </Row>
      <DeleteConfirmModel
        show={showConfirmation}
        close={() => setShowConfirmation(false)}
        title={"Warning"}
        message={
          "The selected Customer will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={confirmDelete}
      />
    </>
  );
};

const CustomerForm = ({ formData, setFormData, editMode }) => (
  <>
    <TextField
      id="id"
      label="Customer ID :"
      value={formData.id}
      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      disabled={!editMode}
    />
    <TextField
      id="fullName"
      label="Full Name"
      value={formData.fullName}
      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      disabled={!editMode}
    />
    <TextField
      id="identifier"
      label="Identifier"
      value={formData.identifier}
      onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
      disabled={!editMode}
    />
    <TextField
      id="address"
      label="Address"
      value={formData.address}
      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      disabled={!editMode}
    />
    <TextField
      id="email"
      label="Email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      disabled={!editMode}
    />
    <TextField
      id="contactNo"
      label="Contact No"
      value={formData.contactNo}
      onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
      disabled={!editMode}
    />
  </>
);

export default CustomerOverviewGeneral;
