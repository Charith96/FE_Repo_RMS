import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
} from "../../store/actions/ReservationAction";
import TitleActionBar from "../../components/TitleActionsBar";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { useNavigate } from "react-router-dom";

const CustomerReservationHistory = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservation.reservations);
  const [loading, setLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(true);
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
    dispatch(fetchReservations());
    if (deleteReservation) {
      dispatch(fetchReservations());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchReservations()).then(() => {
      if (reservations && reservations.length > 0 && email) {
        const filtered = reservations.filter(
          (reservation) => reservation.customerEmail === email
        );
        setFilteredData(filtered);

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
  }, [reservations, currentPage, perPage, selectedRows, isFiltered, email]);

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

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        plustDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
      />
      <div className="table-responsive">
        <ReservationGroupTable
          reservations={reservations}
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
    </div>
  );
};

export default CustomerReservationHistory;
