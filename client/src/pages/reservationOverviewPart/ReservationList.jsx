import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
} from "../../store/actions/ReservationAction";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEllipsisH,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import TitleActionBar from "../../components/TitleActionsBar";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReservationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservations.reservations);
  const [loading, setLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const isAddDisable = useRef(true);
  const isEditDisable = useRef(true);
  const isSaveDisable = useRef(true);
  const isDeleteDisable = useRef(true);
  const [contextMenuRow, setContextMenuRow] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);
  const toggledClearRows = useRef(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const totalItems = useMemo(() => filteredData.length, [filteredData]);

  useEffect(() => {
    if (!reservations || reservations.length === 0) {
      dispatch(fetchReservations())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching reservations: ", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    isAddDisable.current = localStorage.getItem("add") === "false";
    isEditDisable.current = localStorage.getItem("update") === "false";
    isDeleteDisable.current = localStorage.getItem("delete") === "false";
  }, [dispatch, reservations]);

  useEffect(() => {
    if (reservations) {
      const filtered = searchTerm
        ? reservations.filter((res) =>
            Object.values(res).some((val) =>
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        : reservations;

      setFilteredData(filtered);

      const start = currentPage * perPage;
      const end = start + perPage;
      setPaginatedData(filtered.slice(start, end));
    }
  }, [reservations, searchTerm, currentPage, perPage]);

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
    navigate("/Reservations/CreateReservation");
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const confirmDelete = async () => {
    if (selectedRows.length === 1) {
      try {
        setFilteredData((prevData) =>
          prevData.filter(
            (item) => item.reservationCode !== selectedRows[0].reservationCode
          )
        );

        await dispatch(deleteReservation(selectedRows[0]?.reservationCode));
        toast.success("Record Successfully deleted!");

        // Force re-fetch and re-render
        dispatch(fetchReservations());
        setRefreshKey((prevKey) => prevKey + 1);
      } catch (error) {
        toast.error("Error deleting row. Please try again.");

        dispatch(fetchReservations());
      } finally {
        setShowConfirmation(false);
        setSelectedRows([]);
      }
    }
  };

  const handleDetails = () => {
    if (selectedRows.length === 1) {
      const data = {
        reservationID: contextMenuRow.reservationID,
        customerID: contextMenuRow.customerID,
        date: contextMenuRow.date,
        itemId: contextMenuRow.itemId,
        noOfPeople: contextMenuRow.noOfPeople,
        time1_time2: `${contextMenuRow.time1} - ${contextMenuRow.time2}`,
      };
      const dataString = JSON.stringify(data);
      navigate(
        `/reservations/ReservationOverview?data=${encodeURIComponent(
          dataString
        )}`,
        { state: { mode: "view" } }
      );
    }
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
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    const [dayMonthYear, time] = formattedDate.split(", ");
    return `${dayMonthYear} - ${time}`;
  };

  const columns = useMemo(
    () => [
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
        name: "Start Date and Time",
        selector: (row) => formatDateTime(row.time1),
        sortable: true,
        grow: 2,
      },
      {
        name: "End Date and Time",
        selector: (row) => formatDateTime(row.time2),
        sortable: true,
        grow: 2,
      },
      {
        name: "No of People",
        selector: (row) => row.noOfPeople,
        sortable: true,
        grow: 2,
      },
    ],
    []
  );

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
      <div className="menu-item" onClick={handleDetails}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> More info
      </div>
    </div>
  );

  const isSingleRecordSelected = selectedRows.length === 1;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Reservations List"}
        plustDisabled={false}
        editDisabled={true}
        saveDisabled={true}
        deleteDisabled={selectedRows.length !== 1 || isDeleteDisable}
        PlusAction={handleCreate}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={handleDelete}
      />

      <Row>
        <div className="filter-box mb-5">
          <InputGroup className="w-25">
            <Form.Control
              className="bg-white form-control-filter"
              placeholder="Search Reservation"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isFiltered ? (
              <Button
                variant="primary"
                className="form-btn"
                onClick={clearFilter}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            ) : (
              <Button variant="primary" className="form-btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            )}
          </InputGroup>
        </div>
      </Row>

      <div className="table-responsive">
        <ReservationGroupTable
          key={refreshKey}
          reservations={reservations}
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
      </div>

      {/* Popup menu */}
      <div>{customContextMenu}</div>

      {/* Delete confirmation modal */}
      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={
          "The selected Reservation will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={confirmDelete}
      />
    </div>
  );
};

export default ReservationList;
