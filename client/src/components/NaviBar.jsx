import React, { useState }  from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../scss/pages.scss";
import { LinkContainer } from 'react-router-bootstrap';


const NaviBar = ({ option1, option2, option3, option4 }) => {

  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="strip-background">

      {/* Content of your left-aligned strip goes here */}
      
    </div>
  );
};

export default NaviBar;
