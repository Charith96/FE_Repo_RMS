import React from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";

const ReservationItemTimeSlot = ({
  inputValues,
  setInputValues,
  isCustomized,
  duration,

  isAdd,
  isEdit,
  isSave,
  isDelete,
  resetStates,
  setSelectedRecords,

  setIsOverlapping,

  setIsValuesEqual,
}) => {
  useEffect(() => {
    const timeSlots = [...inputValues];
    let isOverlapping = false;

    for (let i = 0; i < timeSlots.length && !isOverlapping; i++) {
      for (let j = i + 1; j < timeSlots.length; j++) {
        const slot1 = timeSlots[i];
        const slot2 = timeSlots[j];

        const start1 = new Date(`2000-01-01T${slot1.startTime}`);
        const end1 = new Date(`2000-01-01T${slot1.endTime}`);
        const start2 = new Date(`2000-01-01T${slot2.startTime}`);
        let end2 = new Date(`2000-01-01T${slot2.endTime}`);

        // Check if end time is before start time, indicating it's on the next day
        if (end2 < start2) {
          end2 = new Date(`2000-01-02T${slot2.endTime}`); // Update end time for next day
        }

        // Check for overlap
        if (start1 < end2 && end1 > start2) {
          isOverlapping = true; // Overlapping time slots found
          break; // Exit the loop once overlap is found
        }
      }
    }

    setIsOverlapping(isOverlapping);

    setIsValuesEqual(
      timeSlots.some((value) => value.startTime === value.endTime)
    );
  }, [inputValues]);
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
    const adjustedMinutes =
      totalMinutes < 10 ? "0" + totalMinutes : totalMinutes;

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
