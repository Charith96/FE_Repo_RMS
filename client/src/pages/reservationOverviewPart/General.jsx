import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
  updateReservationData,
} from "../../store/actions/ReservationAction";
import { Row, Col } from "react-bootstrap";
import TextField from "../../components/TextField";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { toast } from "react-toastify";

const General = ({ reservationData, mode }) => {
  const { reservationID, customerID } = reservationData || {}; // Destructure reservationID and customerID
  const dispatch = useDispatch();
  const [filteredReservationData, setFilteredReservationData] =
    useState(reservationData);
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
      await dispatch( updateReservationData(reservationID, filteredReservationData));
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
            //EditAction={() => setEditMode(true)}
            //DeleteAction={handleDelete}
            //SaveAction={handleSubmit}
          />
          <div style={{ margin: 10, padding: 20 }}>
            {/* Display both Reservation ID and Customer ID */}
            <TextField
              id="reservationID"
              label="Reservation ID :"
              value={reservationID}
              disabled={!editMode}
            />
            <TextField
              id="customerID"
              label="Customer ID"
              value={customerID}
              disabled={!editMode}
            />
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

export default General;
