import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, deleteReservation } from "../../store/actions/ReservationAction";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import TitleActionBar from "../../components/TitleActionsBar";

const ReservationList = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservation.reservations);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  useEffect(() => {
    if (reservations.length > 0) {
      setLoading(false);
    }
  }, [reservations]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsFiltered(e.target.value !== "");
  };

  const clearFilter = () => {
    setSearchTerm("");
    setIsFiltered(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteReservation(id));
  };

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Reservation List"}
        deleteDisabled={true}
        PlusAction={() => {}}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={() => {}}
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
                <FontAwesomeIcon icon={faXmark} size="lg" />
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Customer ID</th>
              <th>Time Slot</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading reservations...</td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation.reservationID}>
                  <td>{reservation.reservationID}</td>
                  <td>{reservation.customerID}</td>
                  <td>{`${reservation.time1} - ${reservation.time2}`}</td> {/* Derive time slot from time1 and time2 */}
                  <td>{reservation.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationList;
