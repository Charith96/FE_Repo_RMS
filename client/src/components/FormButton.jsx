import React from "react";
import { Button } from "react-bootstrap";

const FormButton = ({ className, type, onClick, text, disabled }) => {
  return (    
    <Button className={className} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </Button>       
  );
};

export default FormButton;
