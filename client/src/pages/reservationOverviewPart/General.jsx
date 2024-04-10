import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import TextField from "../../components/TextField";

const ItemInformation = () => {
  return (
    <Row>
      <Col
        xs={12}
        sm={12}
        md={8}
        lg={8}
        xl={8}
        xxl={10}
        className="body-content px-5 pt-4 pb-4 mb-5"
      >
        <form>
          <TextField label="Reservation ID" type="text" />

          <TextField label="Customer ID" type="text" />
        </form>
      </Col>
    </Row>
  );
};

export default ItemInformation;
