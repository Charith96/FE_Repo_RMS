import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchReservations } from "../../store/actions/ReservationAction";
import { Row, Col } from "react-bootstrap";
import TextField from "../../components/TextField";

const General = ({ reservationData, mode }) => {
  const { reservationID, customerID } = reservationData || {};
  const dispatch = useDispatch();
  useState(reservationData);

  useEffect(() => {
    fetchReservationData();
  }, []);

  const fetchReservationData = async () => {
    try {
      await dispatch(fetchReservations(reservationID));
    } catch (error) {}
  };

  if (!reservationData) {
    return <div>No reservation data available.</div>;
  }

  return (
    <>
      <Row>
        <Col>
          <div style={{ margin: 10, padding: 20 }}>
            {/* Display both Reservation ID and Customer ID */}
            <TextField
              id="reservationID"
              label="Reservation ID :"
              value={reservationID}
            />
            <TextField id="customerID" label="Customer ID" value={customerID} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default General;