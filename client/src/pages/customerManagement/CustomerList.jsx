import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, deleteCustomer } from "../../store/actions/customerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faArrowUpRightFromSquare, faEdit ,faSearch} from "@fortawesome/free-solid-svg-icons";
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
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuRow, setContextMenuRow] = useState(null);
  const [editOrDetailsClicked, setEditOrDetailsClicked] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers && customers.length > 0) {
      setFilteredData(customers);
    }
  }, [customers]);

  const handleCellClick = (e, customer) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuRow(customer);
    setShowOptions(true);
  };

  const handleEditNavigation = () => {
    if (selectedCustomers.length === 1) {
      const data = { ...contextMenuRow };
      setSelectedCustomerData(data);
      setEditOrDetailsClicked(true);
      navigate(`/customerManagement/CustomerOverview?data=${data.id}`, { state: { mode: "edit", customerData: data, editOrDetailsClicked: true } });
    }
  };
  
  const handleDetailedNavigation = () => {
    if (selectedCustomers.length === 1) {
      const data = { ...contextMenuRow };
      setSelectedCustomerData(data);
      setEditOrDetailsClicked(false);
      navigate(`/customerManagement/CustomerOverview?data=${data.id}`, { state: { mode: "view", customerData: data, editOrDetailsClicked: false } });
    }
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

  const handleCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };

  const handleDelete = () => {
    dispatch(deleteCustomer(selectedCustomers));
    setSelectedCustomers([]);
  };

  const handleCheckboxChange = (customerId) => {
    const isSelected = selectedCustomers.includes(customerId);
    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const clearFilter = () => {
    setSearchValue("");
    setIsFiltered(false);
    setFilteredData(customers);
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
                    onClick={(e) => handleCellClick(e, customer)}
                  />
                </td>
                <td>{customer.id}</td>
                <td>{customer.fullName}</td>
                <td>{customer.identifier}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.contactNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup menu */}
      {showOptions && (
        <div
          className="styled-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <div className="menu-item" onClick={handleEditNavigation}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </div>
          <div className="menu-item" onClick={handleDetailedNavigation}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Details
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerList;
