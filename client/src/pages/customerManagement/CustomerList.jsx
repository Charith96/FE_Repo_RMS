import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  deleteCustomer,
} from "../../store/actions/customerActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TextField from "../../components/TextField";



function CustomerList() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);
  const [filteredData, setFilteredData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);

    if (customers && customers.length > 0) {
      setFilteredData(
        customers.filter(
          (customer) =>
            customer.fullName &&
            customer.fullName.toLowerCase().includes(inputValue)
        )
      );
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h4 className="subheaderTitle">Customers</h4>
        <div className="search-bar">
          <TextField
            label="Search"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Customer ID</th>
              <th>Full Name</th>
              <th>Identifier</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
            {(filteredData.length > 0 ? filteredData : customers).map(
              (d, i) => (
                <tr key={i}>
                  <td>
                    <input type="checkbox" />
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      onClick={toggleOptions}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    />
                    {showOptions && (
                      <div>
                        <Link to={`/CustomerOverviewGeneral/${d.id}`}>
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                          />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                          onClick={() => {
                            dispatch(deleteCustomer(d.id));
                            dispatch(fetchCustomers());
                          }}
                        />
                      </div>
                    )}
                  </td>
                  <td>{d.id}</td>
                  <td>{d.fullName}</td>
                  <td>{d.identifier}</td>
                  <td>{d.address}</td>
                  <td>{d.email}</td>
                  <td>{d.contactNo}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
