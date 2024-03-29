import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "../../components/TextField";
import { fetchCustomer } from "../../store/actions/customerActions";

function CustomerOverviewGeneral({ customer, fetchCustomer, editOrDetailsClicked }) {
  const { id } = useParams();
  const location = useLocation();
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (location.state && location.state.customerData) {
      setEditedData(location.state.customerData);
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

  return (
    <div className="App">
      <div className="body-part">
        <div>
          <label htmlFor="customerId">Customer ID</label>
          <TextField id="customerId" type="text" value={editedData.id || ""} disabled />
          <label htmlFor="fullName">Full Name</label>
          <TextField id="fullName" type="text" value={editedData.fullName || ""} disabled={!editOrDetailsClicked} onChange={handleChange} />
          <div>
            <label htmlFor="identifier">Identifier</label>
            <TextField id="identifier" type="text" value={editedData.identifier || ""} disabled={!editOrDetailsClicked} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <TextField id="address" type="text" value={editedData.address || ""} disabled={!editOrDetailsClicked} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextField id="email" type="text" value={editedData.email || ""} disabled={!editOrDetailsClicked} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactNo">Contact No</label>
            <TextField id="contactNo" type="text" value={editedData.contactNo || ""} disabled={!editOrDetailsClicked} onChange={handleChange} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOverviewGeneral);
