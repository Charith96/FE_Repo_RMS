import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservationId,
  deleteReservation,
  fetchReservationByItemId,
  updateReservationById,
  
} from "../../store/actions/ReservationAction";
import {
  fetchReservationItemsById,
  fetchTimeSlotsByItemId,
} from "../../store/actions/ReservationItemActions";
import { useLocation } from "react-router-dom";
import TextField from "../../components/TextField";
import { Col, Row, Form } from "react-bootstrap";
import FormButton from "../../components/FormButton";
import { useNavigate } from "react-router-dom";

const ReservationGroupList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservationID = location.state ? location.state.reservationID : null;
  const item = location.state ? location.state.item : null;
  const [slotType, setSlotType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [reservationData, setReservationData] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [btndisable, setBtnDisable] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const [capacity, setCapacity] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  window.addEventListener("beforeunload", function (event) {
    if (!btnClicked) {
      dispatch(deleteReservation(reservationData.id));
    }
  });
  const fetchItem = useSelector(
    (state) => state.getReservationItemById.fetchReservationItemId
  );

  const fetchReservationById = useSelector(
    (state) => state.reservation.reservationsById
  );

  const timeSlots = useSelector(
    (state) => state.getTimeSlotsByItem.timeSlotsByItemId
  );
  const reservationByItem = useSelector(
    (state) => state.reservation.reservationsByItem
  );
  const fetchData = useCallback(() => {
    try {
      dispatch(fetchReservationItemsById(item));
      dispatch(fetchTimeSlotsByItemId(item));
      dispatch(fetchReservationId(reservationID));
      dispatch(fetchReservationByItemId(item));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch, reservationID, item,reservationByItem]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reservationID, formData]);

  useEffect(() => {
    if (fetchReservationById.length > 0 && editMode === false) {
  
      setReservationData(fetchReservationById[0]);
      setFormData({
        id: fetchReservationById[0].id,
        reservationID: fetchReservationById[0].reservationID,
        customerID: fetchReservationById[0].customerID,
        group: fetchReservationById[0].group,
        itemID: fetchReservationById[0].itemID,
        time: fetchReservationById[0].time,
        date: fetchReservationById[0].date,
        noOfPeople: fetchReservationById[0].noOfPeople,
      });
    }
  }, [fetchReservationById, editMode]);

  useEffect(() => {
    setSlotType(fetchItem.timeSlotType);
  }, [fetchItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(updateReservationById(formData.id, formData));
      setBtnClicked(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditMode(true);
    const { id, value } = e.target;

    if (id === "date") {
      try {
        setFormData({
          ...formData,
          [id]: value,
        });
        setDateSelected(true);
      } catch (error) {
      
      }
    } else if (id === "time") {
      const [startTime, endTime] = value.split("-");
      const startDate = new Date(formData.date);
      let endDate = new Date(formData.date);
      const [endHour, endMinute] = endTime.split(":");

      if (parseInt(endHour) < parseInt(startTime)) {
        endDate.setDate(startDate.getDate() + 1);
      }

      endDate.setHours(parseInt(endHour));
      endDate.setMinutes(parseInt(endMinute));

      setFormData({
        ...formData,
        time1: `${formData.date}T${startTime.trim()}`,
        time2: `${endDate.toISOString().split("T")[0]}T${endTime.trim()}`,
      });
    } else if (id === "noOfPeople") {
      const numericValue = parseInt(value);

      if (numericValue <= calculateAvailableCapacity()) {
        setBtnDisable(false);
        setShowMessage(false);

        setFormData({
          ...formData,
          [id]: numericValue,
        });
      } else {
        setBtnDisable(true);
        setShowMessage(true);
      }
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };
  //calculating available reservations according to the date and time range
  const calculateAvailableReservations = () => {
    const time1 = formData.time1;
    const time2 = formData.time2;

    const reservationsWithinTimeRange = reservationByItem.filter(
      (reservation) => {
      
        return (
          (reservation.time1 <= time2 && reservation.time2 >= time1) ||
          (reservation.time1 <= time1 && reservation.time2 >= time2)
        );
      }
    );

    const totalreservationsWithinTimeRange = reservationsWithinTimeRange.length;

    const availableReservation =
      fetchItem.noOfReservations - totalreservationsWithinTimeRange;

    return availableReservation > 0
      ? availableReservation
      : "Reservations filled.";
  };

  //calculating available Capacity according to the date and time range
  const calculateAvailableCapacity = () => {
    if (slotType !== "Flexible") {
      const time1 = formData.time1;
      const time2 = formData.time2;

      const reservationsWithinTimeRangeFle = reservationByItem.filter(
        (reservation) => {
          return (
            (reservation.time1 <= time2 && reservation.time2 >= time1) ||
            (reservation.time1 <= time1 && reservation.time2 >= time2)
          );
        }
      );
      const totalPeopleWithinRangeFlexible =
        reservationsWithinTimeRangeFle.reduce((total, reservation) => {
          return total + reservation.noOfPeople;
        }, 0);

      const availableResFlexible =
        fetchItem.capacity - totalPeopleWithinRangeFlexible;
      return availableResFlexible > 0
        ? availableResFlexible
        : "Capacity Reached.";
    } else {
      const time1 = formData.time1;
      const time2 = formData.time2;

      const reservationsWithinRange = reservationByItem.filter(
        (reservation) => {
          return (
            (reservation.time1 <= time2 && reservation.time2 >= time1) ||
            (reservation.time1 <= time1 && reservation.time2 >= time2)
          );
        }
      );

      const totalPeopleWithinRange = reservationsWithinRange.reduce(
        (total, reservation) => {
          return total + reservation.noOfPeople;
        },
        0
      );

      const availableCapacity = fetchItem.capacity - totalPeopleWithinRange;

      return availableCapacity > 0 ? availableCapacity : "Capacity Reached.";
    }
  };
  //calling avialable capacity function
  const callCalculateAvailableCapacity = () => {
    const availableCapacity = calculateAvailableCapacity();

    if (availableCapacity === "Capacity Reached.") {
      if (!capacity) {
        setCapacity(true);
      }
    } else {
      if (capacity) {
        setCapacity(false);
      }
    }
    return availableCapacity;
  };
  //calling avialable reservation function
  const callcalculateAvailableReservations = () => {
    const availableReservations = calculateAvailableReservations();

    if (availableReservations === "Reservations filled.") {
      if (!reservation) {
        setReservation(true);
      }
    } else {
      if (reservation) {
        setReservation(false);
      }
    }
    return availableReservations;
  };

  const handleDiscard = () => {
    if (reservationData.id) {
      dispatch(deleteReservation(reservationData.id));
      navigate(`/reservations/createReservation`);
    }
  };

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
        <Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={10}
          className="body-content px-5 pt-4 pb-4 mb-5"
        >
          <div>
            <Form onSubmit={handleSubmit}>
              <Col xs={12} md={12}>
                {slotType === "Defined" && (
                  <>
                    {" "}
                    <TextField
                      id="date"
                      type="date"
                      label="Date:"
                      onChange={handleInputChange}
                    />
                    {dateSelected === true && (
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column md={3}>
                          Time Slot
                        </Form.Label>
                        <Col md={9}>
                          <Form.Select id="time" onChange={handleInputChange}>
                            <option value="">Select Time Slot</option>
                            {timeSlots.map((item) => (
                              <option
                                key={item.id}
                                value={`${item.startTime}-${item.endTime}`}
                              >
                                {item.startTime} - {item.endTime}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>
                    )}
                  </>
                )}
              </Col>
              {slotType === "Flexible" && (
                <Row>
                  <Col xs={12} md={6}>
                    <TextField
                      id="time1"
                      type="datetime-local"
                      label="From:"
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col xs={12} md={6}>
                    <TextField
                      id="time2"
                      type="datetime-local"
                      label="To:"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              )}

              <TextField
                id="capacity"
                label="Available Capacity :"
                type="text"
                value={callCalculateAvailableCapacity()}
                disabled={true}
                onChange={handleInputChange}
              />
              {slotType !== "Flexible" && (
                <TextField
                  id="flexibleReservations"
                  label="Available Reservations :"
                  type="text"
                  value={callcalculateAvailableReservations()}
                  disabled={true}
                  onChange={handleInputChange}
                />
              )}
              {slotType === "Flexible" && (
                <TextField
                  id="limitedReservations"
                  label="Available Reservations :"
                  type="text"
                  value={"No Limit"}
                  disabled={true}
                  onChange={handleInputChange}
                />
              )}

              <TextField
                id="noOfPeople"
                label="No of People :"
                type="text"
                onChange={handleInputChange}
              />
              {showMessage && (
                <>
                  <span id="message">More than available Capacity</span>
                  <br></br>
                </>
              )}

              {
                <Form.Group as={Row} className="mb-3">
                  <div className="d-flex justify-content-end">
                    <FormButton
                      type="button"
                      text="Discard"
                      className="form-btn mr-2"
                      onClick={handleDiscard}
                      id="reservationBtn"
                    />
                    <FormButton
                      type="submit"
                      text="Create"
                      className="form-btn"
                      disabled={btndisable || capacity || reservation}
                    />
                  </div>
                </Form.Group>
              }
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default ReservationGroupList;
