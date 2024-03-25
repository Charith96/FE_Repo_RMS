import React, { useState, useEffect, useRef } from "react";
import {
  createReservationGroup,
  resetManageReservationGroupState,
} from "../../store/actions/ReservationGroupActions";
import { checkForDuplicate } from "../../store/actions/ReservationGroupActions";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const CreateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDuplicated = useSelector(
    (state) => state.checkForDuplicates.checkDuplicate
  );
  const reservationGroupData = useSelector(
    (state) => state.createReservationGroup
  );
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [buttonFlag, setButtonFlag] = useState(false);
  const isValueMounted = useRef(false);

  useEffect(() => {
    if (isDuplicated) {
      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  }, [isDuplicated]);

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
          navigate("/reservationManagement/reservation/reservationGroups");
        }, 200);
        clearTextFields();
      }
  }, [dispatch, navigate, reservationGroupData, isValueMounted]);

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (roleId && roleName) {
      const data = {
        roleId: roleId.toString(),
        roleName: roleName,
      };
      dispatch(CreateRole(data));
    } else {
      toast.error("please fill in all the fields");
    }
  };

  const clearTextFields = () => {
    setRoleId("");
    setRoleName("");
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
            <h3 className="mb-5">Create Role</h3>
            <Form onSubmit={handleSubmit}>
              <TextField
                label="Role Id"
                className={`${
                  roleId && isDuplicated ? "is-invalid" : "bg-white"
                }`}
                value={roleId}
                onChange={(e) => {
                  setRoleId(e.target.value);
                  dispatch(checkForDuplicate(e.target.value));
                }}
                maxLength={8}
                inputMessage={"Role ID already exists"}
              />
              <TextField
                value={roleName}
                label="Role Name"
                onChange={(e) => setRoleName(e.target.value)}
              />

              <Form.Group as={Row} className="mb-3">
                <Col className="d-flex justify-content-end">
                  <FormButton
                    type="submit"
                    text="Create"
                    className="form-btn"
                    disabled={!roleId || !roleName || buttonFlag}
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

export default CreateRole;