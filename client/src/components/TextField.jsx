import React from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const TextField = ({
  label,
  disabled,
  type,
  className,
  value,
  onChange,
  inputMessage,
  maxLength,
  id,
}) => {
  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          {label}
        </Form.Label>
        <Col sm={9}>
          <Form.Control
          id={id}
            disabled={disabled}
            type={type}
            className={`w-100 ${
              !value ? "mandatory-field" : "bg-white"
            } ${className}`}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
          />
          <Form.Control.Feedback type="invalid">
            {inputMessage}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </>
  );
};
export default TextField;
