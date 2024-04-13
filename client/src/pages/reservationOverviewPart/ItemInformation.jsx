/*import React, { useEffect, useRef, useState } from "react";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  fetchReservation,
  deleteReservation,
  updateReservationData,
  updateReservations,
} from "../../store/actions/ReservationAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Row } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import ActionTypes from "../../data/ReduxActionTypes";

const ItemInformation = () => {
  const dispatch = useDispatch();
  // Dummy data for testing
  const dummyReservations = [
    { id: 1, customerId: 101, timeSlot: "10:00 AM", date: "2024-04-10" },
    { id: 2, customerId: 102, timeSlot: "11:00 AM", date: "2024-04-11" },
    // Add more dummy reservation data as needed
  ];
  const [reservations, setReservations] = useState(dummyReservations);
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
    // Fetch reservation data from the backend
    dispatch(fetchReservation());
  }, []);

  useEffect(() => {
    // Update paginated and filtered data based on reservations
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
  }, [reservations, currentPage, perPage, selectedRows, isFiltered]);

  const columns = [
    {
      name: "Reservation Id",
      selector: (row) => row.id,
      sortable: true,
      grow: 2,
    },
    {
      name: "Customer Id",
      selector: (row) => row.customerId,
      sortable: true,
      grow: 2,
    },
    {
      name: "Time Slot",
      selector: (row) => row.timeSlot,
      sortable: true,
      grow: 2,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      grow: 2,
    },
    // Other columns for reservation details
  ];

  const confirmDelete = () => {
    if (selectedRows.length === 1) {
      try {
        // Here you may need to adjust the logic based on your actual delete function
        dispatch(deleteReservation(selectedRows[0]?.id));
        toast.success("Reservation successfully deleted!");
      } catch (error) {
        toast.error("Error deleting reservation. Please try again.");
      } finally {
        setShowConfirmation(false);
      }
    }
  };

  const handleCreate = () => {
    // Navigate to reservation creation page
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
    dispatch(fetchReservation());
    setIsFiltered(false);
    setCurrentPage(0);
  };

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        plusDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {
          handleCreate();
        }}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={() => {
          handleDelete();
        }}
      />

      <Row></Row>
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
          "The selected reservation will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={() => {
          confirmDelete();
        }}
      />
    </div>
  );
};

export default ItemInformation;*/
