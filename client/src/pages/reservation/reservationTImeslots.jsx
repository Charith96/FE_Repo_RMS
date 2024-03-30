import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectUserData } from "../../store/Store";

import { useLocation } from "react-router-dom";
import TextField from "../../components/TextField";
import { Col, Row, Form } from "react-bootstrap";

const ReservationGroupList = () => {
  const location = useLocation();
  const groupID = location.state && location.state.groupId;
  const selectedItems=useState([]);
  useEffect(() => {
    console.log(groupID);
  }, [groupID]);

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
            <Col xs={12} md={12}>
                 
                 <Form.Group as={Row} className="mb-3">
                   <Form.Label column md={3}>
                    Time Slot
                   </Form.Label>
                   <Col md={9}>
                     <Form.Select
                       id="item"
                    
                     >
                       <option value="">Select Default Company</option>
                       {selectedItems.map((item) => (
                         <option key={item.id} value={item.itemName}>
                           {item.itemName}
                         </option>
                       ))}
                     </Form.Select>
                   </Col>
                 </Form.Group>
                 </Col>
              <Row>
            
                <Col xs={12} md={6}>
                  <TextField id="time1" type="datetime-local" label="From:" />
                </Col>

                <Col xs={12} md={6}>
                  <TextField id="time2" type="datetime-local" label="To:" />
                </Col>
              </Row>
              <Col xs={12} md={12}>
                <TextField id="time2" type="datetime-local" label="To:" />
              </Col>
              <TextField
                id="lastName"
                label="Available Capacity :"
                type="text"
              />
              <TextField id="lastName" label="No of People :" type="text" />
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default ReservationGroupList;
