import React from "react";
import { Form } from "react-bootstrap";

const Dropdown = ({ options, id, text, selectedOption, handleChange }) => {
  return (
    <Form.Group controlId={id} className="mb-3 row">
      <Form.Label column sm={2}>
        {text}
      </Form.Label>
      <div className="col-sm-10">
        <Form.Control
          as="select"
          value={selectedOption}
          onChange={handleChange}
          className="custom-select"
          style={{
            backgroundColor: "#EFEFEF",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23000' d='M0 2l4 4 4-4H0z'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "8px 8px",
            paddingRight: "2rem",
          }}
        >
          <option value="">--Please choose an option--</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
      </div>
    </Form.Group>
  );
};

export default Dropdown;
