import React, { useEffect, useRef, useState } from "react";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

import {
  fetchCustomers,
  deleteCustomer,
  fetchCustomer
} from "../../store/actions/customerActions";

import { faArrowUpRightFromSquare, faEdit, faEllipsisH, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Row, Button, Form, InputGroup } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectCustomer } from "../../store/Store";

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector(selectCustomer)
  const customers = useSelector((state) => state.customerReducer.customers);
  let { value } = useParams();
  
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
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
    if (deleteCustomer) {
      dispatch(fetchCustomers());
    }
  }, []);
  

  useEffect(() => {
    dispatch(fetchCustomers()).then(() => {
      if (customers && customers.length > 0 && !isFiltered) {
        setFilteredData(customers);
        
        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = customers?.slice(start, end);
        setPaginatedData(slicedData);
  
        if (selectedRows.length === 1) {
          setIsDeleteDisable(false);
        } else {
          setIsDeleteDisable(true);
        }
      }
    });
  }, [customers, currentPage, perPage, selectedRows, isFiltered]);
  

  const columns = [
    {
      name: "",
      cell: (row) => (
        <div className="cell-actions">
         
        </div>
      ),
    },
    {
      name: "Item Id",
      selector: (row) => row.id,
      sortable: true,
      grow: 2,
    },
    {
      name: "Date",
      selector: (row) => row.fullName,
      sortable: true,
      grow: 2,
    },
    {
      name: "Time slot",
      selector: (row) => row.identifier,
      sortable: true,
      grow: 2,
    }, 
  

    {
      name: "No. of people",
      selector: (row) => row.address,
      sortable: true,
      grow: 2,
    }
  ];

  const handleCellClick = (e, row) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
    setContextMenuRow(row);
  };

 
  
 
 
     

  const confirmDelete = () => {
    if (selectedRows.length === 1) {
      try {
        dispatch(deleteCustomer(selectedRows[0]?.id));
        toast.success("Record Successfully deleted!");
      } catch (error) {
        toast.error("Error deleting row. Please try again.");
      } finally {
        setShowConfirmation(false);
      }
    }
  };

  const handleCreate = () => {
    navigate("/customerManagement/CustomerCreation");
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilter = () => {
    setSearchTerm("");
    dispatch(fetchCustomers());
    setIsFiltered(false);
    setCurrentPage(0);
  };

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        plustDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {
          handleCreate();
        }}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={() => {
         // handleDelete();
        }}
      />

      <Row>
          
      </Row>
      <ReservationGroupTable
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