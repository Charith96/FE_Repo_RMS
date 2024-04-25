import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
  updateReservationData,
} from "../../store/actions/ReservationAction";
import { Row, Col, Table } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { toast } from "react-toastify";

const ItemInformation = ({ reservationData, mode }) => {
  const { reservationID } = reservationData || {};
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(mode === "edit");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!editMode) {
      fetchReservationData();
    }
  }, []);

  const fetchReservationData = async () => {
    try {
      // Fetch reservation data based on reservationID
      await dispatch(fetchReservations(reservationID));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    try {
      // Delete reservation based on reservationID
      dispatch(deleteReservation(reservationID));
      toast.success("Record Successfully deleted!");
    } catch (error) {
      toast.error("Error deleting row. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Update reservation based on reservationID
      await dispatch( updateReservationData(reservationID, reservationData));
      setEditMode(false);
    } catch (error) {
      console.error("Error saving data:", error);
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
          <TitleActionBar
            Title={""}
            isPlusHidden={true}
            isEditHidden={true}
            isSaveHidden={true}
            isDeleteHidden={true}
          />
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
      <DeleteConfirmModel
        show={showConfirmation}
        close={() => setShowConfirmation(false)}
        title={"Warning"}
        message={
          "The selected Reservation will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={confirmDelete}
      />
    </>
  );
};

export default ItemInformation;
