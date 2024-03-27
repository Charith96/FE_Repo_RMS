import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import TextField from "../../components/TextField";

import { fetchCustomer } from "../../store/actions/customerActions";

function CustomerOverviewGeneral({ customer, fetchCustomer }) {
  const dispatch = useDispatch();
  const { id } = useParams();
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
            value={customer ? customer.fullName : ""}
            disabled={true}
          />
          <div>
            <label htmlFor="identifier">Identifier</label>
            <TextField
              id="identifier"
              type="text"
              value={customer ? customer.identifier : ""}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <TextField
              id="address"
              type="text"
              value={customer ? customer.address : ""}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              type="text"
              value={customer ? customer.email : ""}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="contactNo">Contact No</label>
            <TextField
              id="contactNo"
              type="text"
              value={customer ? customer.contactNo : ""}
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
