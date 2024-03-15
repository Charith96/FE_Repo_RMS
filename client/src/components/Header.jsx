import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../scss/pages.scss";

const Header = ({ className }) => {
  return (
    <div>
      <Row>
        <Col md={12} xs={12} sm={12} lg={12} xl={12} className={className}>
          
        </Col>
      </Row>
    </div>
  );
};

export default Header;
