import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchReservations } from "../../store/actions/ReservationAction";
import { Row, Col, Table } from "react-bootstrap";

const ItemInformation = ({ reservationData }) => {
  const { reservationID } = reservationData || {};
  const dispatch = useDispatch();

  useEffect(() => {
    fetchReservationData();
  }, []);

  const fetchReservationData = async () => {
    try {
      // Fetch reservation data based on reservationID
      await dispatch(fetchReservations(reservationID));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Check if reservationData exists
  if (!reservationData) {
    return <div>No reservation data available.</div>;
  }

  return (
    <>
      <Row>
        <Col>
          <div style={{ margin: 10, padding: 20 }}>
            {/* Display Reservation Data in a Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Date</th>
                  <th>No of People</th>
                  <th>Time Slot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reservationData.itemID}</td>
                  <td>{reservationData.date}</td>
                  <td>{reservationData.noOfPeople}</td>
                  <td>{reservationData.time1_time2}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ItemInformation;