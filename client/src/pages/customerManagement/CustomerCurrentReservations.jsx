import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,

} from "../../store/actions/ReservationAction";
import TitleActionBar from "../../components/TitleActionsBar";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { useNavigate } from "react-router-dom";


const CustomerCurrentReservations = ({ customerId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservations.reservations);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuRow, setContextMenuRow] = useState(null);
  const isAddDisable = useRef(false)?.current;
  const isEditDisable = useRef(true)?.current;
  const isSaveDisable = useRef(true)?.current;
  const [isDeleteDisable, setIsDeleteDisable] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const totalItems = filteredData.length;
  const toggledClearRows = useRef(false);

  useEffect(() => {
    // Fetch reservations on component mount
    dispatch(fetchReservations());
  }, []);

  useEffect(() => {
    // Update filtered data when reservations or pagination settings change
    if (reservations && reservations.length > 0 && customerId) {
      const filtered = reservations.filter(
        (reservation) =>
          reservation.customerID === customerId &&
          new Date(reservation.date) >= new Date()
      );
      setFilteredData(filtered);

      const start = currentPage * perPage;
      const end = start + perPage;
      const slicedData = filtered.slice(start, end);
      setPaginatedData(slicedData);

      if (selectedRows.length === 1) {
        setIsDeleteDisable(false);
      } else {
        setIsDeleteDisable(true);
      }
    }
  }, [reservations, currentPage, perPage, selectedRows, customerId]);

  const handleCreate = () => {
    navigate("/Reservations/CreateReservation");
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    const [dayMonthYear, time] = formattedDate.split(", ");
    return `${dayMonthYear} - ${time}`;
  };

  const formatTimeSlot = (time1, time2) => {
    return `From ${formatDateTime(time1)} To ${formatDateTime(time2)}`;
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
      selector: (row) => formatTimeSlot(row.time1, row.time2),
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
    // Handle cell click event (context menu)
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
    setContextMenuRow(row);
  };

  const customContextMenu = menuVisible && (
    // Custom context menu component
    <div
      className="styled-menu"
      style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
    ></div>
  );

  // Check if single record is selected
  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      {/* Title and action bar */}
      <TitleActionBar
        plustDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {
          handleCreate();
        }}
        
      />

      <div className="table-responsive">
        {/* Reservation table component */}
        <ReservationGroupTable
          reservations={paginatedData}
          selectableRows={true}
          selectableRowsSingle={true}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
          setSelectedRows={setSelectedRows}
          setMenuVisible={setMenuVisible}
          paginatedData={paginatedData}
          filteredData={filteredData}
          totalItems={filteredData.length}
          currentPage={currentPage}
          perPage={perPage}
          columns={columns}
          menuVisible={menuVisible}
          contextMenuPosition={contextMenuPosition}
          toggledClearRows={toggledClearRows}
          isSingleRecordSelected={isSingleRecordSelected}
          onCellClick={handleCellClick}
        />
      </div>

      {/* Popup menu */}
      <div>{customContextMenu}</div>

    </div>
  );
};

export default CustomerCurrentReservations;