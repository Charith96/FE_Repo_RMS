import React, { useEffect, useState } from "react";
import { useParams, useNavigate ,useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import TextField from "../../components/TextField";
import { fetchCustomer } from "../../store/actions/customerActions";
import TitleActionBar from "../../components/TitleActionsBar";

function CustomerOverviewGeneral({ customer, fetchCustomer, editOrDetailsClicked }) {
  const { id } = useParams();
  const location = useLocation();
  const [editedData, setEditedData] = useState({});
  const [editMode, setEditMode] = useState(false);
  //const [isViewMode, setIsViewMode]=useState(false);
 // const dispatch = useDispatch();
  //const [mode,setMode]=useState(mode);
  //const navigate = useNavigate();

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

      <TitleActionBar
            Title={""}
            // plustDisabled={isAddDisable}
            EditAction={() => setEditMode(true)}
            SaveAction={() => {
              //handleSubmit();
            }}
          
            PlusAction={() => {
              //handleCreate();
            }}
          
            DeleteAction={() => {
             // handleDelete();
            }}
          />
        <div>
          <TextField
            label="Customer ID"
            value={editedData.id || ""}
            disabled
          />
          <TextField
            label="Full Name"
            value={editedData.fullName || ""}
            disabled={!editOrDetailsClicked}
            onChange={handleChange}
          />
          <TextField
            label="Identifier"
            value={editedData.identifier || ""}
            disabled={!editOrDetailsClicked}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            value={editedData.address || ""}
            disabled={!editOrDetailsClicked}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            value={editedData.email || ""}
            disabled={!editOrDetailsClicked}
            onChange={handleChange}
          />
          <TextField
            label="Contact No"
            value={editedData.contactNo || ""}
            disabled={!editOrDetailsClicked}
            onChange={handleChange}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOverviewGeneral);
