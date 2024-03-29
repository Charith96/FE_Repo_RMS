import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "../../components/TextField";
import { fetchCustomer, updateCustomer } from "../../store/actions/customerActions";

function CustomerOverviewGeneral({ customer, fetchCustomer, updateCustomer }) {
  const { id } = useParams();
  const location = useLocation();
  const [editedData, setEditedData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.customerData) {
      setEditedData(location.state.customerData);
      setIsEditMode(location.state.mode === "edit");
    } else {
      fetchData();
    }
  }, [id, location.state]);

  const fetchData = async () => {
    try {
      const customerData = await fetchCustomer(id);
      setEditedData(customerData || {});
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateCustomer(editedData);
    // Optionally, you can redirect to another page after saving
  };

  return (
    <div className="App">
      <div className="body-part">
        <div>
          <label htmlFor="customerId">Customer ID</label>
          <TextField id="customerId" type="text" value={editedData.id || ""} disabled />
          <label htmlFor="fullName">Full Name</label>
          <TextField id="fullName" type="text" name="fullName" value={editedData.fullName || ""} disabled={!isEditMode} onChange={handleChange} />
          <div>
            <label htmlFor="identifier">Identifier</label>
            <TextField id="identifier" type="text" name="identifier" value={editedData.identifier || ""} disabled={!isEditMode} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <TextField id="address" type="text" name="address" value={editedData.address || ""} disabled={!isEditMode} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextField id="email" type="text" name="email" value={editedData.email || ""} disabled={!isEditMode} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactNo">Contact No</label>
            <TextField id="contactNo" type="text" name="contactNo" value={editedData.contactNo || ""} disabled={!isEditMode} onChange={handleChange} />
          </div>
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
    updateCustomer: (customerData) => dispatch(updateCustomer(customerData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOverviewGeneral);
