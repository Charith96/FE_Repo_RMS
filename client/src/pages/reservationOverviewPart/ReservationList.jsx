import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservation } from "../../store/actions/ReservationAction";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReservationGroupTable from "../../components/table/DataTableComponent";

const ReservationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservationReducer.reservations);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchReservation());
  }, [dispatch]);

  useEffect(() => {
    setFilteredReservations(reservations);
  }, [reservations]);

  const handleEdit = (id) => {
    navigate(`/edit-reservation/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedReservation(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (selectedReservation) {
      // Dispatch delete action here
      setShowConfirmation(false);
      toast.success("Reservation successfully deleted");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter((reservation) =>
        reservation.reservationID.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredReservations(filtered);
    }
  };

  const columns = [
    {
      name: "Reservation ID",
      selector: (row) => row.reservationID,
    },
    {
      name: "Customer ID",
      selector: (row) => row.customerID,
    },
    {
      name: "Item ID",
      selector: (row) => row.itemID,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button variant="info" onClick={() => handleEdit(row.id)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>{" "}
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Reservation List"}
        deleteDisabled={selectedReservation === null}
        DeleteAction={() => setShowConfirmation(true)}
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
          </InputGroup>
        </div>
      </Row>
      <ReservationGroupTable
        selectableRows={true}
        selectableRowsSingle={true}
        // Add other props as needed
        data={filteredReservations}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <DeleteConfirmModel
        show={showConfirmation}
        close={() => setShowConfirmation(false)}
        title={"Warning"}
        message={"Are you sure you want to delete this reservation?"}
        action={handleConfirmDelete}
      />
    </div>
  );
};

export default ReservationList;
