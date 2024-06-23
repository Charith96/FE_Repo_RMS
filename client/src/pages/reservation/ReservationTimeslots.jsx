import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservationByItemId,
  createReservation,
} from "../../store/actions/ReservationAction";
import {
  fetchReservationItemsById,
  fetchTimeSlots,
} from "../../store/actions/ReservationItemActions";
import { useLocation } from "react-router-dom";
import TextField from "../../components/TextField";
import { Col, Row, Form } from "react-bootstrap";
import FormButton from "../../components/FormButton";
import { toast } from "react-toastify";
import FlexibleTimeSlots from "./ReservationTimeFlexible";
import { useNavigate } from "react-router-dom";
const ReservationGroupList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const reservationID = location.state ? location.state.reservationID : null;
  const item = location.state ? location.state.item : null;
  const group = location.state ? location.state.group : null;
  const customer = location.state ? location.state.customerid : null;
  const [slotType, setSlotType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [btndisable, setBtnDisable] = useState(false);
  const [capacity, setCapacity] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [viewBtn, setViewBtn] = useState(false);

  const fetchItem = useSelector(
    (state) => state.getReservationItemById.fetchReservationItemId
  );

  const timeSlots = useSelector((state) => state.getTimeSlotsReducer.timeSlots);
  const reservationByItem = useSelector(
    (state) => state.reservationByItem.reservationsByItem
  );
  const fetchData = useCallback(() => {
    try {
      dispatch(fetchReservationItemsById(item));
      dispatch(fetchReservationByItemId(item));
      dispatch(fetchTimeSlots());
    } catch (error) {}
  }, [dispatch, item]);

  useEffect(() => {
    fetchData();
  }, [fetchData, formData, reservationByItem]);

  useEffect(() => {
    if (editMode === false) {
      setFormData({
        reservationID: reservationID,
        customerID: customer,
        group: group,
        itemID: item,
      });
    }
    if (formData.noOfPeople && formData.time1 && formData.time2) {
      setViewBtn(true);
    } else {
      setViewBtn(false);
    }
  }, [editMode, dispatch, formData, reservationID, group, customer, item]);

  useEffect(() => {
    setSlotType(fetchItem.timeSlotType);
  }, [fetchItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(createReservation(formData));
      toast.success("Reservation Created Successfully!");
      setBtnDisable(true);
    } catch (error) {
      toast.error("Error Creating Reservation. Please Try Again.");
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
      } catch (error) {}
    } else if (id === "time") {
      if (value === "label") {
        setFormData({
          ...formData,
          time1: "",
          time2: "",
        });
        return false;
      }
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

  const handleDiscard = () => {
    navigate(`/reservations/createReservation`);
  };

  return (
    <>
      {slotType === "Flexible" && <FlexibleTimeSlots />}
      {slotType === "Defined" && (
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
                              <option value="label">Select Time Slot</option>
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

                <TextField
                  id="capacity"
                  label="Available Capacity :"
                  type="text"
                  value={callCalculateAvailableCapacity()}
                  disabled={true}
                  onChange={handleInputChange}
                />

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
                        disabled={btndisable || capacity || !viewBtn}
                      />
                    </div>
                  </Form.Group>
                }
              </Form>
            </div>
          </Col>
          <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
        </Row>
      )}
    </>
  );
};

export default ReservationGroupList;
