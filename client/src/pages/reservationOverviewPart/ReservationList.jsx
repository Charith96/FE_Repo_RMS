import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, deleteReservation } from "../../store/actions/ReservationAction";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import TitleActionBar from "../../components/TitleActionsBar";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReservationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservation.reservations);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchReservations()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsFiltered(e.target.value !== "");
  };

  const clearFilter = () => {
    setSearchTerm("");
    setIsFiltered(false);
    setCurrentPage(0);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (selectedRows.length === 1) {
      try {
        dispatch(deleteReservation(selectedRows[0]?.reservationID));
        toast.success("Record Successfully deleted!");
      } catch (error) {
        toast.error("Error deleting row. Please try again.");
      } finally {
        setShowConfirmation(false);
      }
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      // Perform edit action here, such as navigating to an edit page
      console.log("Edit action");
    }
  };

  const handleDetails = () => {
    if (selectedRows.length === 1) {
      // Perform details action here, such as displaying more information
      console.log("Details action");
    }
  };

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
      name: "Reservation ID",
      selector: (row) => row.reservationID,
      sortable: true,
    },
    {
      name: "Customer ID",
      selector: (row) => row.customerID,
      sortable: true,
    },
    {
      name: "Time Slot",
      selector: (row) => `${row.time1} - ${row.time2}`,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ];

  const handleCellClick = (e, row) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const customContextMenu = menuVisible && (
    <div
      className="styled-menu"
      style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
    >
      <div className="menu-item" onClick={handleEdit}>
        Edit
      </div>
      <div className="menu-item" onClick={handleDetails}>
        Details
      </div>
      <div className="menu-item" onClick={handleDelete}>
        Delete
      </div>
    </div>
  );

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Reservation List"}
        PlusAction={() => {}}
        EditAction={handleEdit}
        SaveAction={() => {}}
        DeleteAction={handleDelete}
        deleteDisabled={selectedRows.length !== 1}
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
              <Button variant="primary" className="form-btn" onClick={clearFilter}>
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            ) : (
              <Button variant="primary" className="form-btn" onClick={() => {}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            )}
          </InputGroup>
        </div>
      </Row>

      <div className="table-responsive">
      <ReservationGroupTable
          selectableRows={true}
          selectableRowsSingle={true}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
          setSelectedRows={setSelectedRows}
          setMenuVisible={setMenuVisible}
          paginatedData={reservations}
          totalItems={reservations.length}
          currentPage={currentPage}
          perPage={perPage}
          columns={columns}
        />
      </div>

      {customContextMenu}

      <DeleteConfirmModel
        show={showConfirmation}
        close={() => setShowConfirmation(false)}
        title={"Warning"}
        message={"The selected Reservation will be deleted. Do you wish to continue?"}
        type={"Yes"}
        action={confirmDelete}
      />
    </div>
  );
};

export default ReservationList;
