import React, { useEffect,useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, deleteReservation } from "../../store/actions/ReservationAction";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerReservationHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservation.reservations);
  const [loading, setLoading] = useState(true);
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


  /*useEffect(() => {
    dispatch(fetchReservations()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);*/

  useEffect(() => {
    dispatch(fetchReservations());
    if (deleteReservation) {
      dispatch(fetchReservations());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchReservations()).then(() => {
      if (reservations && reservations.length > 0 && !isFiltered) {
        setFilteredData(reservations);

        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = reservations?.slice(start, end);
        setPaginatedData(slicedData);

        if (selectedRows.length === 1) {
          setIsDeleteDisable(false);
        } else {
          setIsDeleteDisable(true);
        }
      }
    });
  }, [reservations, currentPage, perPage, selectedRows, isFiltered]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsFiltered(e.target.value !== "");
  };

  const clearFilter = () => {
    setSearchTerm("");
    setIsFiltered(false);
    setCurrentPage(0);
  };

  const handleCreate = () => {
    //navigate("/customerManagement/CustomerCreation");
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const confirmDelete = () => {
    if (selectedRows.length === 1) {
      try {
        dispatch(deleteReservation(selectedRows[0]?.id));
        toast.success("Record Successfully deleted!");
      } catch (error) {
        toast.error("Error deleting row. Please try again.");
      } finally {
        setShowConfirmation(false);
      }
    }
  };


  const columns = [
    
    {
      name: "Reservation ID",
      selector: (row) => row.reservationID,
      sortable: true,
      grow: 2,
    },
    {
      name: "Customer ID",
      selector: (row) => row.customerID,
      sortable: true,
      grow: 2,
    },
    {
      name: "Time Slot",
      selector: (row) => `${row.time1} - ${row.time2}`,
      sortable: true,
      grow: 2,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      grow: 2,
    },
    {
      name: "Item ID",
      selector: (row) => row.itemID,
      sortable: true,
      grow: 2,
    },
    {
      name: "No of People",
      selector: (row) => row.noOfPeople,
      sortable: true,
      grow: 2,
    },
  ];

  const handleCellClick = (e, row) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
    setContextMenuRow(row);
  

  };
  

  const customContextMenu = menuVisible && (
    <div
      className="styled-menu"
      style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
    >
     {/* <div className="menu-item" onClick={() => handleEdit()}>
        <FontAwesomeIcon icon={faEdit} /> Edit
  </div> 
      <div className="menu-item" onClick={() => handleDetails()}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> More info
      </div> */}
    </div>
  );

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">

      <div className="table-responsive">
      <ReservationGroupTable
          reservations={reservations}
          selectableRows={true}
          selectableRowsSingle={true}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
          setSelectedRows={setSelectedRows}
          setMenuVisible={setMenuVisible}
          paginatedData={reservations}
          filteredData={filteredData}
          totalItems={reservations.length}
          currentPage={currentPage}
          perPage={perPage}
          columns={columns}
          menuVisible={menuVisible}
          contextMenuPosition={contextMenuPosition}
          toggledClearRows={toggledClearRows}
          isSingleRecordSelected={isSingleRecordSelected}
        />
      </div>

       {/* Popup menu */}
       <div>{customContextMenu}</div>

       <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={
          "The selected Reservation will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={() => {
          confirmDelete();
        }}
      />
    </div>
  );
};

export default CustomerReservationHistory;
