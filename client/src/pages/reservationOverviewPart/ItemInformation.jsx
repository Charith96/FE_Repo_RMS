import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchReservations, updateReservation } from "../../store/actions/ReservationAction";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ItemInformation = ({ reservationData, setDisableEdit }) => {
  const { reservationID } = reservationData || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(reservationData);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(false);

  useEffect(() => {
    fetchReservationData();

    // Load editedData from localStorage if available
    const storedData = localStorage.getItem(`editedReservation-${reservationID}`);
    if (storedData) {
      setEditedData(JSON.parse(storedData));
    }
    setIsAddDisable(localStorage.getItem("add") === "false");
    setIsEditDisable(localStorage.getItem("update") === "false");
    setIsDeleteDisable(localStorage.getItem("delete") === "false");
  }, [reservationID]);

  const fetchReservationData = async () => {
    try {
      await dispatch(fetchReservations(reservationID));
    } catch (error) {
      // Handle error
    }
  };

  const handleCreate = () => {
    navigate("/Reservations/CreateReservation");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setDisableEdit(false);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateReservation(editedData));
      toast.success("Reservation successfully updated!");
      setIsEditing(false);
      setDisableEdit(true);


      localStorage.setItem(`editedReservation-${reservationID}`, JSON.stringify(editedData));
    } catch (error) {
      toast.error("Error saving changes. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
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
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    const [dayMonthYear, time] = formattedDate.split(", ");
    return `${dayMonthYear} - ${time}`;
  };

  const formatTimeSlot = (timeSlot) => {
    const [time1, time2] = timeSlot.split(" - ");
    return `From ${formatDateTime(time1)} To ${formatDateTime(time2)}`;
  };

  if (!reservationData) {
    return <div>No reservation data available.</div>;
  }

  return (
    <>
      <Row>
        <Col>
          <TitleActionBar
            plusDisabled={isAddDisable}
            editDisabled={isEditDisable}
            saveDisabled={false}
            deleteDisabled={isDeleteDisable}
            PlusAction={handleCreate}
            EditAction={handleEdit}
            SaveAction={handleSave}
            DeleteAction={() => { }}
          />
          <div style={{ margin: 10, padding: 20 }}>
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
                  <td>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="itemID"
                        value={editedData.itemId}
                        onChange={handleChange}
                      />
                    ) : (
                      editedData.itemId
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="date"
                        value={editedData.date}
                        onChange={handleChange}
                      />
                    ) : (
                      editedData.date
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        name="noOfPeople"
                        value={editedData.noOfPeople}
                        onChange={handleChange}
                      />
                    ) : (
                      editedData.noOfPeople
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="time1_time2"
                        value={editedData.time1_time2}
                        onChange={handleChange}
                      />
                    ) : (
                      formatTimeSlot(editedData.time1_time2)
                    )}
                  </td>
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