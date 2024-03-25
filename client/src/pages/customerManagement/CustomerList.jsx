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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customerReducer.customers);
  const [filteredData, setFilteredData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

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

  const clearFilter = () => {
    setSearchValue("");
    setIsFiltered(false);
    setFilteredData(customers);
  };

  const handleCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };


  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Customer List"}
        plustDisabled={false}
        editDisabled={true}
        saveDisabled={true}
        deleteDisabled={true}
        PlusAction={() => {
          handleCreate();
        }}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={() => {}}
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
                        <Link to={`/CustomerOverview/${d.id}`}>
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
