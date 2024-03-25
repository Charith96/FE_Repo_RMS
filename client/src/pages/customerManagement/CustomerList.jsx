import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, deleteCustomer } from "../../store/actions/customerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash, faSearch, faArrowUpRightFromSquare, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customerReducer.customers);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers && customers.length > 0) {
      setFilteredData(customers);
    }
  }, [customers]);

  const toggleOptions = (customer) => {
    setSelectedCustomer(customer);
    setShowOptions(!showOptions);
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);
    setIsFiltered(inputValue !== "");

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

  const clearFilter = () => {
    setSearchValue("");
    setIsFiltered(false);
    setFilteredData(customers);
  };

  const handleCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };

  const handleEditCustomer = (customerId) => {
    navigate(`/customerManagement/CustomerOverview/${customerId}`);
    setShowOptions(false);
  };

  const handleViewDetails = (customerId) => {
    navigate(`/customerManagement/CustomerOverview/${customerId}`);
    setShowOptions(false);
  };

  const handleCheckboxChange = (customerId) => {
    const isSelected = selectedCustomers.includes(customerId);
    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleDelete = () => {
    dispatch(deleteCustomer(selectedCustomers));
    setSelectedCustomers([]);
  };

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Customer List"}
        plustDisabled={false}
        editDisabled={true}
        saveDisabled={true}
        deleteDisabled={selectedCustomers.length === 0}
        PlusAction={handleCreate}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={handleDelete}
      />

      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by full name"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <Button
              variant="primary"
              onClick={() => setIsFiltered(true)}
              className="search-button"
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            {isFiltered && (
              <Button
                variant="light"
                onClick={clearFilter}
                className="clear-button"
              >
                Clear
              </Button>
            )}
          </InputGroup>
        </Col>
      </Row>

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((customer, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleCheckboxChange(customer.id)}
                  />
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => toggleOptions(customer)}
                  />
                </td>
                <td>{customer.id}</td>
                <td>{customer.fullName}</td>
                <td>{customer.identifier}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.contactNo}</td>
                <td>
                  {showOptions && selectedCustomer && selectedCustomer.id === customer.id && (
                    <div className="more-options">
                      <div className="option" onClick={() => handleViewDetails(customer.id)}>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Details
                      </div>
                      <div className="option" onClick={() => handleEditCustomer(customer.id)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit 
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
