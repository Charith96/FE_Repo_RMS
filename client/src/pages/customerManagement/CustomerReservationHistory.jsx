import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
} from "../../store/actions/ReservationAction";
import TitleActionBar from "../../components/TitleActionsBar";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { useNavigate } from "react-router-dom";

const CustomerReservationHistory = ({ customerId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservations.reservations);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [menuVisible, setMenuVisible] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const toggledClearRows = useRef(false);

  useEffect(() => {
    // Fetch reservations on component mount
    dispatch(fetchReservations());
    if (deleteReservation) {
      // Fetch reservations again if deleteReservation action is dispatched
      dispatch(fetchReservations());
    }
  }, []);

  useEffect(() => {
    // Update filtered data when reservations or pagination settings change
    dispatch(fetchReservations()).then(() => {
      if (reservations && reservations.length > 0 && customerId) {
        const filtered = reservations.filter(
          (reservations) => reservations.customerID === customerId
        );
        setFilteredData(filtered);

        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = reservations?.slice(start, end);
        setPaginatedData(slicedData);

      }
    });
  }, [reservations, currentPage, perPage, selectedRows, isFiltered, customerId]);

  // Table columns definition
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

  // Check if single record is selected
  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      {/* Title and action bar */}
      <TitleActionBar
        plustDisabled={true}
        editDisabled={true}
        saveDisabled={true}
        deleteDisabled={true}
      />
      <div className="table-responsive">
        {/* Reservation table component */}
        <ReservationGroupTable
          reservations={reservations}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
          setSelectedRows={setSelectedRows}
          setMenuVisible={setMenuVisible}
          paginatedData={paginatedData}
          filteredData={filteredData}
          totalItems={reservations.length}
          currentPage={currentPage}
          perPage={perPage}
          columns={columns}
          menuVisible={menuVisible}
          toggledClearRows={toggledClearRows}
          isSingleRecordSelected={isSingleRecordSelected}
        />
      </div>
    </div>
  );
};

export default CustomerReservationHistory;