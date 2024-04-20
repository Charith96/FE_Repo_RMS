import React from "react";
import TextField from "../../components/TextField";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";

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
}) => {
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
