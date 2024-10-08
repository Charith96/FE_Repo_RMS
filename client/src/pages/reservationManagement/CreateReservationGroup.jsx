import React, { useState, useEffect, useRef } from "react";
import {
  createReservationGroup,
  resetManageReservationGroupState,
  fetchReservationGroups,
} from "../../store/actions/ReservationGroupActions";
import { checkForDuplicate } from "../../store/actions/ReservationGroupActions";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const CreateReservationGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDuplicated = useRef(false);

  const reservationGroupData = useSelector(
    (state) => state.createReservationGroup
  );

  const fetchReservationGroupData = useSelector(
    (state) => state.getReservationGroup.fetchReservationGroup
  );

  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [buttonFlag, setButtonFlag] = useState(false);
  const isValueMounted = useRef(false);

  useEffect(() => {
    dispatch(fetchReservationGroups());
  }, [dispatch]);

  useEffect(() => {
    if (!isValueMounted.current)
      if (
        reservationGroupData &&
        reservationGroupData.createReservationGroup !== null &&
        reservationGroupData.createError === null
      ) {
        isValueMounted.current = true;
        toast.success("Reservation group created successfully");
        setTimeout(() => {
          dispatch(resetManageReservationGroupState());
          navigate(
            "/reservationManagement/reservation/reservationGroup/reservationGroups"
          );
        }, 200);
        clearTextFields();
      }
  }, [dispatch, navigate, reservationGroupData, isValueMounted]);

  //to handle submit button functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fetchReservationGroupData) {
      const isDuplicate = fetchReservationGroupData.some(
        (group) => group.groupId === groupId
      );
      if (isDuplicate) {
        toast.error("Group ID already exists");
        isDuplicated.current = true;
        return;
      }
    }

    if (groupId && groupName) {
      const data = {
        groupId: groupId.toString(),
        groupName: groupName,
      };
      dispatch(createReservationGroup(data));
    } else {
      toast.error("please fill in all the fields");
    }
  };

  const clearTextFields = () => {
    setGroupId("");
    setGroupName("");
  };

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
            <h3 className="mb-5">Create Reservation Group</h3>
            <Form onSubmit={handleSubmit}>
              <TextField
                label="Group ID"
                value={groupId}
                onChange={(e) => {
                  setGroupId(e.target.value);
                  //dispatch(checkForDuplicate(e.target.value));
                }}
                maxLength={8}
                inputMessage={"Group ID already exists"}
              />
              <TextField
                value={groupName}
                label="Group Name"
                onChange={(e) => setGroupName(e.target.value)}
                maxLength={20}
              />

              <Form.Group as={Row} className="mb-3">
                <Col className="d-flex justify-content-end">
                  <FormButton
                    type="submit"
                    text="Create"
                    className="form-btn"
                    disabled={!groupId || !groupName}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default CreateReservationGroup;
