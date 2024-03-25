import React, { useState, useEffect } from "react";
import { fetchReservationGroups } from "../../store/actions/ReservationGroupActions";
import { createReservationItem } from "../../store/actions/ReservationItemActions";
import { createTimeSlots } from "../../store/actions/ReservationItemActions";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const CreateReservationItem = () => {
  const dispatch = useDispatch();
  const fetchReservationGroupDataForTheForm = useSelector(
    (state) => state.getReservationGroup.fetchReservationGroup
  );
  const itemIdForTheTimeSlots = useSelector(
    (state) => state.createReservationItem.createReservationItem.id
  );
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [timeSlotType, setTimeSlotType] = useState("");
  const [noOfSlots, setNoOfSlots] = useState("");
  const [slotDurationType, setSlotDurationType] = useState("");
  const [durationPerSlot, setDurationPerSlot] = useState("");
  const [noOfReservations, setNoOfReservations] = useState("");
  const [capacity, setCapacity] = useState("");
  const [reservationGroup, setReservationGroup] = useState("");
  const [isFlexible, setIsFlexible] = useState(true);
  const [isNoOfSlots, setIsNoOfSlots] = useState(true);
  const [isCustomized, setIsCustomized] = useState(false);
  const [isDurationPerSlot, setIsDurationPerSlot] = useState(true);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchReservationGroups());
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!(itemIdForTheTimeSlots === "")) {
      const data = inputValues.map((value) => ({
        ...value,
        itemId: itemIdForTheTimeSlots,
      }));
      data.forEach((value) => {
        dispatch(createTimeSlots(value));
      });
    }
  }, [dispatch, itemIdForTheTimeSlots]);

  const setToInitialState = () => {
    setItemName("");
    setItemId("");
    setTimeSlotType("");
    setNoOfSlots("");
    setSlotDurationType("");
    setDurationPerSlot("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      itemId: itemId.toString(),
      itemName: itemName,
      timeSlotType: timeSlotType,
      noOfSlots: parseInt(noOfSlots, 10),
      slotDurationType: slotDurationType,
      durationPerSlot: parseInt(durationPerSlot, 10),
      noOfReservations: parseInt(noOfReservations, 10),
      capacity: parseInt(capacity, 10),
      reservationGroup: reservationGroup,
    };

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
          toast.success("Reservation Item created successfully");
          setToInitialState();
        } else if (isCustomized && noOfSlots) {
          dispatch(createReservationItem(data));
          toast.success("Reservation Item created successfully");
          setToInitialState();
        } else if (durationPerSlot) {
          dispatch(createReservationItem(data));
          toast.success("Reservation Item created successfully");
          setToInitialState();
        } else {
          toast.error("Please fill in the required fields");
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
                  className={`w-100 ${!reservationGroup ? "mandatory-field" : "bg-white"}`}
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
                  className={`w-100 ${!itemId ? "mandatory-field" : "bg-white"}`}
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
                  className={`w-100 ${!itemName ? "mandatory-field" : "bg-white"}`}
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
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
                      setDurationPerSlot("");
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
                      setDurationPerSlot(
                        e.target.checked ? "" : durationPerSlot
                      );
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
                  type="text"
                  className="w-100"
                  value={noOfSlots}
                  onChange={(e) => {
                    setNoOfSlots(e.target.value);
                    setIsNoOfSlots(e.target.value === "");
                    handleInputChange(e.target.value);
                  }}
                  disabled={isFlexible}
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
                  className="w-100"
                  value={durationPerSlot}
                  onChange={(e) => {
                    setDurationPerSlot(e.target.value);
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
                  onChange={(e) => setNoOfReservations(e.target.value)}
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
                    setCapacity(e.target.value);
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