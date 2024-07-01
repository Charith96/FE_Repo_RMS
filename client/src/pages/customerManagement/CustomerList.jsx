import React, { useEffect, useRef, useState } from "react";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchCustomers,
  deleteCustomer,
  resetCustomerState,
} from "../../store/actions/CustomerActions";

import {
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsisH,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const fetchCustomerData = useSelector(
    (state) => state.getCustomer.fetchCustomer
  );
  const deleteCustomerData = useSelector(
    (state) => state.deleteCustomer.deleteCustomer
  );

  // State variables
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const isAddDisable = useRef(true);
  const isEditDisable = useRef(true);
  const isSaveDisable = useRef(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(true);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuRow, setContextMenuRow] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);
  const totalItems = filteredData.length;
  const toggledClearRows = useRef(false);

  useEffect(() => {
    dispatch(fetchCustomers());
    isAddDisable.current = localStorage.getItem("add") === "false";
    isEditDisable.current = localStorage.getItem("update") === "false";
  }, [dispatch]);

  useEffect(() => {
    // Fetch customers and update data when customers or pagination settings change
    if (fetchCustomerData && fetchCustomerData.length > 0 && !isFiltered) {
      setFilteredData(fetchCustomerData);
    }
    const start = currentPage * perPage;
    const end = start + perPage;
    const slicedData = filteredData?.slice(start, end);
    setPaginatedData(slicedData);

    if (selectedRows.length === 1 && localStorage.getItem("delete") === "true") {
      setIsDeleteDisable(false);
    } else {
      setIsDeleteDisable(true);
    }
  }, [fetchCustomerData, currentPage, perPage, filteredData, selectedRows]);

  // Table columns definition
  const columns = [
    {
      name: "",
      cell: (row) => (
        <div className="cell-actions">
          <span
            className="ellipsis tree-dots"
            onClick={(e) => handleCellClick(e, row)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </span>
        </div>
      ),
    },
    {
      name: "Customer Id",
      selector: (row) => row.customerID,
      sortable: true,
      grow: 2,
    },
    {
      name: "Customer Name",
      selector: (row) => row.fullName,
      sortable: true,
      grow: 2,
    },
    {
      name: "Identifier",
      selector: (row) => row.identifier,
      sortable: true,
      grow: 2,
    },

    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      grow: 2,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contactNo,
      sortable: true,
      grow: 2,
    },
  ];

  // Function to handle cell click (context menu)
  const handleCellClick = (e, row) => {
    e.preventDefault(); //prevents the default behavior of the click event
    setContextMenuPosition({ x: e.clientX, y: e.clientY }); //sets the position of the context menu based on the coordinates of the mouse click event
    setMenuVisible(true);
    setContextMenuRow(row);
  };

  //Edit option's functionality
  const handleEditNavigation = () => {
    if (selectedRows.length === 1) {
      // Navigate to edit page if only one row is selected
      let data = { customerCode: contextMenuRow.customerCode, customerID: contextMenuRow.customerID }; // Copy the row data
      let dataString = JSON.stringify(data); // Convert data to string
      navigate(
        `/customerManagement/CustomerOverview?data=${encodeURIComponent(
          dataString
        )}`,
        { state: { mode: "edit" } }
      );
    }
  };

  //Details option's functionality
  const handleDetailedNavigation = () => {
    if (selectedRows.length === 1) {
      let data = {
        customerCode: contextMenuRow.customerCode,
        customerID: contextMenuRow.customerID
      };
      let dataString = JSON.stringify(data);
      navigate(
        `/customerManagement/CustomerOverview?data=${encodeURIComponent(
          dataString
        )}`,
        { state: { mode: "view" } }
      );
    }
  };

  //Display Edit and Details options(Custom context menu component)
  const customContextMenu = menuVisible && (
    <div
      className="styled-menu"
      style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
    >
      <div className="menu-item" onClick={() => handleEditNavigation()}>
        <FontAwesomeIcon icon={faEdit} /> Edit
      </div>
      <div className="menu-item" onClick={() => handleDetailedNavigation()}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Details
      </div>
    </div>
  );

  // Function to handle filtering based on search term
  const handleFilter = () => {
    if (searchTerm === "") {
      setFilteredData(fetchCustomerData);
    } else {
      const filtered = fetchCustomerData.filter((item) =>
        item.customerID
          ?.toString()
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())
      );

      setIsFiltered(true);
      dispatch(resetCustomerState(filtered));
      setFilteredData(filtered);
    }
  };

  // Function to confirm deletion of selected row
  const confirmDelete = async () => {
    if (selectedRows.length === 1) {
      try {
        setFilteredData((prevData) =>
          prevData.filter(
            (item) => item.customerCode !== selectedRows[0].customerCode
          )
        );

        await dispatch(deleteCustomer(selectedRows[0]?.customerCode));
        toast.success("Record Successfully deleted!");

        // Force re-fetch and re-render
        dispatch(fetchCustomers());
        setRefreshKey((prevKey) => prevKey + 1);
      } catch (error) {
        toast.error("Error deleting row. Please try again.");

        dispatch(fetchCustomers());
      } finally {
        setShowConfirmation(false);
        setSelectedRows([]);
      }
    }
  };
  // Function to handle create action(Plus icon)
  const handleCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };

  // Function to handle delete action
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  // Function to handle change in search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to clear filter
  const clearFilter = () => {
    setSearchTerm("");
    dispatch(fetchCustomers());
    setIsFiltered(false);
    setCurrentPage(0);
  };

  // Check if single record is selected
  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      {/* Title and action bar */}
      <TitleActionBar
        Title={"Customer List"}
        plusDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {
          handleCreate();
        }}
        EditAction={() => { }}
        SaveAction={() => { }}
        DeleteAction={() => {
          handleDelete();
        }}
      />

      <Row>
        {/* Search input */}
        <div className="filter-box mb-5">
          <InputGroup className="w-25">
            <Form.Control
              className="bg-white form-control-filter"
              placeholder="Search..."
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isFiltered ? (
              <Button
                variant="primary"
                className="form-btn"
                id="button-addon2"
                onClick={clearFilter}
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </Button>
            ) : (
              <Button
                variant="primary"
                className="form-btn"
                id="button-addon2"
                onClick={handleFilter}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            )}
          </InputGroup>
        </div>
      </Row>

      {/* Reservation group table */}
      <ReservationGroupTable
        key={refreshKey}
        selectableRows={true}
        selectableRowsSingle={true}
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
        setSelectedRows={setSelectedRows}
        setMenuVisible={setMenuVisible}
        paginatedData={paginatedData}
        filteredData={filteredData}
        totalItems={totalItems}
        currentPage={currentPage}
        perPage={perPage}
        columns={columns}
        menuVisible={menuVisible}
        contextMenuPosition={contextMenuPosition}
        toggledClearRows={toggledClearRows}
        isSingleRecordSelected={isSingleRecordSelected}
      />

      {/* Popup menu */}
      <div>{customContextMenu}</div>

      {/* Delete confirmation modal */}
      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={
          "The selected Customer will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={() => {
          confirmDelete();
        }}
      />
    </div>
  );
};

export default CustomerList;