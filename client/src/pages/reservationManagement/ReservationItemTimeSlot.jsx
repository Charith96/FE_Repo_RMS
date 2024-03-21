import React from "react";
import { Form } from "react-bootstrap";

const ReservationItemTimeSlot = ({
  inputValues,
  setInputValues,
  isCustomized,
  duration,
  setDuration,
  setIsCustomized,
  isAdd,
  isEdit,
  isSave,
  isDelete,
  resetStates,
  setSelectedRecords,
}) => {
  //time slot value management
  const addDurationToStartTime = (startTime, duration) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [durationHours, durationMinutes] = duration.split(":").map(Number);
  
    let totalHours = startHours + durationHours;
    let totalMinutes = startMinutes + durationMinutes;
  
    // Adjust for overflow in minutes
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  
    // Adjust for overflow in hours (beyond 24-hour clock)
    totalHours %= 24;
  
    // Format the result
    const adjustedHours = totalHours < 10 ? "0" + totalHours : totalHours;
    const adjustedMinutes = totalMinutes < 10 ? "0" + totalMinutes : totalMinutes;
  
    return `${adjustedHours}:${adjustedMinutes}`;
  };
  

  return (
    <div>
      {inputValues.map((value, index) => (
        <React.Fragment key={index}>
          <Form.Group controlId={`form_${index}`} className="d-flex">
            <Form.Control
              type="time"
              onChange={(e) => {
                const newValues = [...inputValues];
                newValues[index].startTime = e.target.value;
                //update endTime using addDurationToStartTime function
                !isCustomized &&
                  (newValues[index].endTime = addDurationToStartTime(
                    e.target.value,
                    duration
                  ));
                setInputValues(newValues);
              }}
              className="mr-2"
            />
            <span className="align-self-center">TO</span>
            <Form.Control
              type="time"
              value={
                !isCustomized
                  ? addDurationToStartTime(value.startTime, duration)
                  : value.endTime || "" //display the customized value if provided
              }
              onChange={(e) => {
                const newValues = [...inputValues];
                newValues[index].endTime = e.target.value;
                setInputValues(newValues);
              }}
              className="ml-2"
            />
          </Form.Group>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReservationItemTimeSlot;
