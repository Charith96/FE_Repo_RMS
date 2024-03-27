import React from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const CheckboxField = ({
  label,
  disabled,
  className,
  checked,
  onChange,
}) => {
  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          {label}
        </Form.Label>
        <Col sm={9}>
          <Form.Check
            disabled={disabled}
            className={`w-100 ${className}`}
            checked={checked}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default CheckboxField;
