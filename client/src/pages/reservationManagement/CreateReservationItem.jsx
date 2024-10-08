import React, { useState, useEffect, useRef } from "react";
import { fetchReservationGroups } from "../../store/actions/ReservationGroupActions";
import { createReservationItem } from "../../store/actions/ReservationItemActions";
import { fetchReservationItems } from "../../store/actions/ReservationItemActions";
import { createTimeSlots } from "../../store/actions/ReservationItemActions";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateReservationItem = ({
  inputValues,
  setInputValues,
  isCustomized,
  setIsCustomized,
  duration,
  setDuration,
  isOverlapping,
  isValuesEqual,
}) => {
  const dispatch = useDispatch();
  const fetchReservationGroupDataForTheForm = useSelector(
    (state) => state.getReservationGroup.fetchReservationGroup
  );
  const itemIdForTheTimeSlots = useSelector(
    (state) => state.createReservationItem.createReservationItem.id
  );
  const fetchReservationItemData = useSelector(
    (state) => state.getReservationItem.fetchReservationItem
  );
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [timeSlotType, setTimeSlotType] = useState("");
  const [noOfSlots, setNoOfSlots] = useState("");
  const [slotDurationType, setSlotDurationType] = useState("");
  const navigate = useNavigate();
  const [noOfReservations, setNoOfReservations] = useState("");
  const [capacity, setCapacity] = useState("");
  const [reservationGroup, setReservationGroup] = useState("");
  const [isFlexible, setIsFlexible] = useState(true);
  const [IsNoOfSlots, setIsNoOfSlots] = useState(true);
  const isDuplicated = useRef(false);

  const [isDurationPerSlot, setIsDurationPerSlot] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchReservationGroups());
        dispatch(fetchReservationItems());
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (itemIdForTheTimeSlots !== "") {
      const data = inputValues.map((value) => ({
        ...value,
        itemId: itemIdForTheTimeSlots,
      }));

      data.forEach((value) => {
        // Assuming value.startTime and value.endTime are in "HH:MM" format
        const today = new Date();
        const dateString = today.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

        const startTimeString = `${dateString}T${value.startTime}:00.000Z`;
        const endTimeString = `${dateString}T${value.endTime}:00.000Z`;

        var timeSlot = {
          itemId: itemIdForTheTimeSlots,
          startTime: startTimeString,
          endTime: endTimeString,
        };
        dispatch(createTimeSlots(timeSlot));
      });
    }
  }, [dispatch, itemIdForTheTimeSlots]); // Ensure all dependencies are included

  //after submission reset the form
  const setToInitialState = () => {
    setItemName("");
    setItemId("");
    setTimeSlotType("");
    setNoOfSlots("");
    setSlotDurationType("");
    setDuration("");
    setNoOfReservations("");
    setCapacity("");
    setReservationGroup("");
    setIsFlexible(true);
    setIsNoOfSlots(true);
    setIsCustomized(false);
    setIsDurationPerSlot(true);
  };
  const handleInputChange = (e) => {
    const numberOfObjects = parseInt(e, 10);
    const newArray = Array.from({ length: numberOfObjects }, () => ({
      startTime: "",
      endTime: "",
      itemId: itemIdForTheTimeSlots,
    }));
    setInputValues(newArray);
  };
  //to handle the submit request
  const handleSelectChange = (e) => {
    setReservationGroup(e.target.value);
  };

  const handleNavigate = () => {
    setTimeout(() => {
      navigate(
        "/reservationManagement/reservation/reservationItem/reservationItems"
      );
    }, 200);
  };

  //to handle the submit click
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fetchReservationItemData) {
      const isDuplicate = fetchReservationItemData.some(
        (item) => item.itemId === itemId
      );
      if (isDuplicate) {
        toast.error("Item ID already exists");
        isDuplicated.current = true;
        return;
      }
    }

    const data = {
      itemId: itemId.toString(),
      itemName: itemName,
      groupId: reservationGroup,
      timeSlotType: timeSlotType,
      slotDurationType: slotDurationType,
      durationPerSlot: duration,
      noOfSlots: parseInt(noOfSlots, 10) || 0,
      noOfReservations: noOfReservations,
      capacity: capacity,
    };

    const isValidInput = inputValues.every((value) => {
      //Check if startTime and endTime exist and are not null or empty
      return (
        value &&
        value.startTime !== null &&
        value.startTime.trim() !== "" &&
        value.endTime !== null &&
        value.endTime.trim() !== ""
      );
    });

    try {
      if (
        itemId &&
        itemName &&
        timeSlotType &&
        noOfReservations &&
        capacity &&
        reservationGroup
      ) {
        if (isFlexible) {
          dispatch(createReservationItem(data));
          setTimeout(() => {
            handleNavigate();
          }, 200);
          toast.success("Reservation Item created successfully");
          setToInitialState();
        } else if (
          isCustomized &&
          noOfSlots &&
          isValidInput &&
          !isOverlapping &&
          !isValuesEqual
        ) {
          dispatch(createReservationItem(data));
          setTimeout(() => {
            handleNavigate();
          }, 200);
          toast.success("Reservation Item created successfully");
          setToInitialState();
        } else if (
          duration &&
          isValidInput &&
          !isOverlapping &&
          !isValuesEqual
        ) {
          dispatch(createReservationItem(data));
          setTimeout(() => {
            handleNavigate();
          }, 200);
          toast.success("Reservation Item created successfully");
          setToInitialState();
        } else {
          if (isOverlapping) {
            toast.error("Time slots are overlapping");
          } else if (isValuesEqual) {
            toast.error("start time and end time cannot be the same");
          } else {
            toast.error("Please fill in the required fields");
          }
        }
      } else {
        toast.error("Please fill in the required fields");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
        <Col md={8} sm={8} className="px-5 pt-4 pb-4 mb-5">
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Reservation Group
              </Form.Label>
              <Col md={9}>
                <Form.Select
                  custom
                  className={`w-100 ${
                    !reservationGroup ? "mandatory-field" : "bg-white"
                  }`}
                  value={reservationGroup}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Reservation Group</option>
                  {fetchReservationGroupDataForTheForm.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.groupName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Item ID
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  className={`w-100 ${
                    !itemId ? "mandatory-field" : "bg-white"
                  }`}
                  maxLength={8}
                  value={itemId}
                  onChange={(e) => {
                    setItemId(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Item Name
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  className={`w-100 ${
                    !itemName ? "mandatory-field" : "bg-white"
                  }`}
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                  maxLength={20}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Time Slot Type
              </Form.Label>
              <Col md={9}>
                <div className="form-check form-check-inline">
                  <Form.Check
                    inline
                    type="radio"
                    label="Defined"
                    name="radioOptions"
                    value="Defined"
                    checked={timeSlotType === "Defined"}
                    onChange={(e) => {
                      setTimeSlotType(e.target.value);
                      setIsFlexible(false);
                    }}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Flexible"
                    name="radioOptions"
                    value="Flexible"
                    checked={timeSlotType === "Flexible"}
                    onChange={(e) => {
                      setTimeSlotType(e.target.value);
                      setIsFlexible(true);
                      setNoOfSlots("");
                      setDuration("");
                    }}
                  />
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Slot Duration type
              </Form.Label>
              <Col md={9}>
                <div className="form-check form-check-inline">
                  <Form.Check
                    inline
                    type="radio"
                    label="Customized"
                    name="radio"
                    value="Customized"
                    disabled={isFlexible}
                    checked={slotDurationType === "Customized"}
                    onChange={(e) => {
                      setSlotDurationType(e.target.value);
                      setIsCustomized(true);
                      setDuration(e.target.checked ? "" : duration);
                    }}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Fixed"
                    name="radio"
                    value="Fixed"
                    disabled={isFlexible}
                    checked={slotDurationType === "Fixed"}
                    onChange={(e) => {
                      setSlotDurationType(e.target.value);
                      setIsCustomized(false);
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                No of Slots
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="number"
                  className="w-100"
                  value={noOfSlots}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Ensure value doesn't exceed 20
                    if (
                      value !== "" &&
                      (parseInt(value) > 20 || parseInt(value) < 0)
                    ) {
                      value = 20; // Set value to maximum if it exceeds 20
                    }
                    setNoOfSlots(value);
                    setIsNoOfSlots(value === "");
                    handleInputChange(value);
                  }}
                  disabled={isFlexible}
                  max={20} // Set the maximum allowed value
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Duration per Slot
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  value={duration}
                  placeholder="HH:MM"
                  onChange={(e) => {
                    setDuration(e.target.value);
                    setIsDurationPerSlot(e.target.value === "");
                  }}
                  disabled={isFlexible || isCustomized}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                No of Reservations (per time slot)
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  className="w-100"
                  value={noOfReservations}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Regex pattern to match positive numbers including zero and asterisk
                    const regex = /^[0-9*]*$/;

                    // Check if the input matches the pattern
                    if (regex.test(inputValue)) {
                      if (inputValue === "*" || inputValue === "") {
                        setNoOfReservations(inputValue);
                      } else if (!isNaN(inputValue)) {
                        //setNoOfReservations(parseInt(inputValue, 10));
                        setNoOfReservations(inputValue);
                      } else {
                        setNoOfReservations("");
                      }
                    } else {
                      setNoOfReservations("");
                    }
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3}>
                Capacity:
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  className="w-100"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Regex pattern to match positive numbers including zero
                    const regex = /^(-|[0-9]+)$/;

                    // Check if the input matches the pattern
                    if (regex.test(inputValue)) {
                      if (inputValue === "-" || inputValue === "") {
                        setCapacity(inputValue);
                      } else {
                        //setCapacity(parseInt(inputValue, 10));
                        setCapacity(inputValue);
                      }
                    } else {
                      setCapacity("");
                    }
                  }}
                  value={capacity}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col className="d-flex justify-content-end">
                <FormButton
                  type="submit"
                  text="Submit"
                  className="form-btn"
                  onClick={handleSubmit}
                  disabled={false}
                />
              </Col>
            </Form.Group>
          </Form>
          <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
        </Col>
      </Row>
    </>
  );
};

export default CreateReservationItem;
