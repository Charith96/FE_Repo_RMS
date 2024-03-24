import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSave,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import TextField from "../../components/TextField";

import { updateCustomer, deleteCustomer, fetchCustomer } from "../../store/actions/customerActions";

function CustomerOverviewGeneral({
  customer,
  updateCustomer,
  deleteCustomer,
  fetchCustomer,
}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await dispatch(fetchCustomer(id));
        setEditedData(customerData || {});
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedData = { ...customer, ...editedData };
    updateCustomer(id, updatedData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleDelete = () => {
    deleteCustomer(id);
  };

  return (
    <div className="App">
      <div className="body-part" >
        <div >
          
            <label htmlFor="customerId">Customer ID</label>
            <TextField id="customerId" type="text" value={id} disabled={true} />
          

          
            <label htmlFor="fullName">Full Name</label>
            <TextField
              id="fullName"
              type="text"
              value={isEditing ? editedData.fullName : customer?.fullName || ""}
              disabled={!isEditing}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          

          <div >
            <label htmlFor="identifier">Identifier</label>
            <TextField
              id="identifier"
              type="text"
              value={isEditing ? editedData.identifier : customer?.identifier || ""}
              disabled={!isEditing}
              onChange={(e) => handleChange("identifier", e.target.value)}
            />
          </div>

          <div >
            <label htmlFor="address">Address</label>
            <TextField
              id="address"
              type="text"
              value={isEditing ? editedData.address : customer?.address || ""}
              disabled={!isEditing}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              type="text"
              value={isEditing ? editedData.email : customer?.email || ""}
              disabled={!isEditing}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div >
            <label htmlFor="contactNo">Contact No</label>
            <TextField
              id="contactNo"
              type="text"
              value={isEditing ? editedData.contactNo : customer?.contactNo || ""}
              disabled={!isEditing}
              onChange={(e) => handleChange("contactNo", e.target.value)}
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            style={{ marginRight: "10px", padding: "2px", borderRadius: 10 }}
          />
          <Link to={`/CustomerCreation`}>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ cursor: "pointer" }}
            />
          </Link>
          {isEditing ? (
            <FontAwesomeIcon
              icon={faSave}
              style={{ cursor: "pointer" }}
              onClick={handleSave}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEdit}
              style={{ cursor: "pointer" }}
              onClick={handleEdit}
            />
          )}
          <FontAwesomeIcon
            icon={faTrash}
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer.customer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomer: (customerId) => dispatch(fetchCustomer(customerId)),
    updateCustomer: (customerId, updatedData) => dispatch(updateCustomer(customerId, updatedData)),
    deleteCustomer: (customerId) => dispatch(deleteCustomer(customerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOverviewGeneral);
