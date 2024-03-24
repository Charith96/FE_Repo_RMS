import React from "react";
import TextField from "../../components/TextField";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";

const ManageReservationItems = ({
  itemId,
  setItemId,
  groupName,
  setGroupName,
  itemName,
  setItemName,
  noOfReservations,
  setNoOfReservations,
  capacity,
  setCapacity,
  isViewMode,
  noOfSlots,
  setNoOfSlots,
  setInputValues,
  inputValues,
  noOfAddedSlots,
  setNoOfAddedSlots,
}) => {
  

const handleInputChange = (value) => {
  const parsedValue = parseInt(value, 10); // Parse value as integer
  console.log("xyz",noOfAddedSlots )
  const numberOfObjects = parsedValue - parseInt(noOfAddedSlots,10);

  console.log("noofobj", numberOfObjects);
  const newArray = Array.from({ length: numberOfObjects }, () => ({
    startTime: "",
    endTime: "",
    itemId: itemId, // Make sure itemId is defined in your component
  }));
  setNoOfAddedSlots(0); // Resetting the value after usage
  setInputValues([...inputValues, ...newArray]);
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
            <Form>
              <TextField
                label="GroupName"
                className={`${!groupName ? "is-invalid" : ""}`}
                disabled
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <TextField
                label="ItemID"
                className={`${!itemId ? "is-invalid" : ""}`}
                disabled
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
              />
              <TextField
                label="ItemName"
                className={`${!itemName ? "is-invalid" : "bg-white"}`}
                value={itemName}
                disabled={isViewMode}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                label="No of Slots"
                type={"number"}
                className={`${!noOfSlots ? "is-invalid" : "bg-white"}`}
                value={noOfSlots}
                disabled={isViewMode}
                onChange={(e) => {
                  handleInputChange(e.target.value);

                  setNoOfSlots(e.target.value);
                }}
              />
              <TextField
                label="No of Reservations"
                className={`${!noOfReservations ? "is-invalid" : "bg-white"}`}
                value={noOfReservations}
                disabled={isViewMode}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Regex pattern to match positive numbers including zero and asterisk
                  const regex = /^[0-9*]*$/;

                  // Check if the input matches the pattern
                  if (regex.test(inputValue)) {
                    if (inputValue === "*" || inputValue === "") {
                      setNoOfReservations(inputValue);
                    } else if (!isNaN(inputValue)) {
                      setNoOfReservations(parseInt(inputValue, 10));
                    } else {
                      setNoOfReservations("");
                    }
                  } else {
                    setNoOfReservations("");
                  }
                }}
              />
              <TextField
                label="Capacity"
                className={`${!capacity ? "is-invalid" : "bg-white"}`}
                value={capacity}
                disabled={isViewMode}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Regex pattern to match positive numbers including zero
                  const regex = /^(-|[0-9]+)$/;

                  // Check if the input matches the pattern
                  if (regex.test(inputValue)) {
                    if (inputValue === "-" || inputValue === "") {
                      setCapacity(inputValue);
                    } else {
                      setCapacity(parseInt(inputValue, 10));
                    }
                  } else {
                    setCapacity("");
                  }
                }}
              />
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};
export default ManageReservationItems;
