import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "../../components/TextField";
import { fetchCustomer } from "../../store/actions/customerActions";

function CustomerOverviewGeneral({ customer, fetchCustomer, selectedCustomerData, editOrDetailsClicked }) {
  const { id } = useParams();
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (editOrDetailsClicked && selectedCustomerData) {
      setEditedData(selectedCustomerData);
    } else {
      fetchData();
    }
  }, [id, editOrDetailsClicked, selectedCustomerData]);

  const fetchData = async () => {
    try {
      const customerData = await fetchCustomer(id);
      setEditedData(customerData || {});
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  return (
    <div className="App">
      <div className="body-part">
        <div>
          <label htmlFor="customerId">Customer ID</label>
          <TextField id="customerId" type="text" value={id} disabled={true} />
          <label htmlFor="fullName">Full Name</label>
          <TextField
            id="fullName"
            type="text"
            value={editOrDetailsClicked && selectedCustomerData ? selectedCustomerData.fullName : customer ? customer.fullName : ""}
            disabled={true}
          />
          <div>
            <label htmlFor="identifier">Identifier</label>
            <TextField
              id="identifier"
              type="text"
              value={editOrDetailsClicked && selectedCustomerData ? selectedCustomerData.identifier : customer ? customer.identifier : ""}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <TextField
              id="address"
              type="text"
              value={editOrDetailsClicked && selectedCustomerData ? selectedCustomerData.address : customer ? customer.address : ""}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              type="text"
              value={editOrDetailsClicked && selectedCustomerData ? selectedCustomerData.email : customer ? customer.email : ""}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="contactNo">Contact No</label>
            <TextField
              id="contactNo"
              type="text"
              value={editOrDetailsClicked && selectedCustomerData ? selectedCustomerData.contactNo : customer ? customer.contactNo : ""}
              disabled={true}
            />
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
