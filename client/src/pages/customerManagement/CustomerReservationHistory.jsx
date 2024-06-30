import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations } from "../../store/actions/ReservationAction";
import TitleActionBar from "../../components/TitleActionsBar";
import ReservationGroupTable from "../../components/table/DataTableComponent";

const CustomerReservationHistory = ({ customerId }) => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const toggledClearRows = useRef(false);

  useEffect(() => {
    // Fetch reservations on component mount
    dispatch(fetchReservations());
  }, [dispatch]);

  useEffect(() => {
    // Update filtered data when reservations or pagination settings change
    if (reservations && reservations.length > 0 && customerId) {
      const today = new Date();
      const filtered = reservations.filter(
        (reservation) =>
          reservation.customerID === customerId &&
          new Date(reservation.time1) < today &&
          new Date(reservation.time2) < today
      );
      setFilteredData(filtered);

      const start = currentPage * perPage;
      const end = start + perPage;
      const slicedData = filtered.slice(start, end);
      setPaginatedData(slicedData);
    }
  }, [reservations, currentPage, perPage, customerId]);

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
      name: "Item ID",
      selector: (row) => row.itemId,
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
          toggledClearRows={toggledClearRows}
        />
      </div>
    </div>
  );
};

export default CustomerReservationHistory;
