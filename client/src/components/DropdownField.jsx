import React from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const DropdownField = ({
  label,
  disabled,
  className,
  value,
  onChange,
  options,
}) => {
  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          {label}
        </Form.Label>
        <Col sm={9}>
          <Form.Select
            disabled={disabled}
            className={`w-100 ${className}`}
            value={value}
            onChange={onChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
    </>
  );
};

export default DropdownField;
