import React, { useEffect, useState } from "react";
import { fetchReservationGroupsById } from "../../store/actions/ReservationGroupActions";
import { deleteReservationGroup } from "../../store/actions/ReservationGroupActions";
import {
  editReservationGroup,
  fetchReservationItemByGroupId,
} from "../../store/actions/ReservationGroupActions";

import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/TextField";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const ManageReservationGroups = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchReservationGroupData = useSelector(
    (state) => state.getReservationGroupById.fetchReservationGroupId
  );
  const fetchReservationItemByGroupData = useSelector(
    (state) => state.fetchReservationItemByGroup.fetchReservationItemByGroupFlag
  );

  const [recordId, setRecordId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isViewMode, setIsViewMode] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemsExist, setItemsExist] = useState(false);
  const [count, setCount] = useState(0);
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);
  const mode = state ? state.mode : null;

  useEffect(() => {
    if (paramData && recordId) {
      dispatch(fetchReservationGroupsById(recordId));
      dispatch(fetchReservationItemByGroupId(recordId));
    }
  }, [dispatch, recordId]);

  useEffect(() => {
    if (fetchReservationItemByGroupData) {
      setItemsExist(fetchReservationItemByGroupData);
    } else {
      setItemsExist(fetchReservationItemByGroupData);
    }
  }, [fetchReservationItemByGroupData]);

  const fetchData = () => {
    if (fetchReservationGroupData) {
      let filterData = fetchReservationGroupData;
      if (filterData) {
        if (count === 0) {
          setGroupId(filterData?.groupId ?? "");
          setGroupName(filterData?.groupName ?? "");
          if (mode) {
            if (mode === "edit") {
              setIsViewMode(false);
              setIsEditDisable(true);
              setIsSaveDisable(false);
            } else if (mode === "view") {
              setIsViewMode(true);
              setIsEditDisable(false);
              setIsSaveDisable(true);
            }
          }
        }
      } else {
        handleNavigate();
      }
      setCount(1);
    }
  };

  useEffect(() => {
    if (paramData && paramData.id && paramData.id !== "") {
      setRecordId(paramData.id);
    }
    if (recordId) {
      setTimeout(() => fetchData(), 100);
    }
  }, [isSaveDisable, recordId, fetchData]);

  const handleEdit = () => {
    setIsAddDisable(true);
    setIsEditDisable(true);
    setIsDeleteDisable(true);
    setIsViewMode(false);
    setIsSaveDisable(false);
  };

  //to handle the save button click
  const handleSave = async () => {
    try {
      if (paramData && recordId) {
        const formData = {
          id: recordId,
          groupId: groupId,
          groupName: groupName,
        };

        dispatch(editReservationGroup(recordId, formData));
        handleNavigate();
        toast.success("Data saved successfully");
      } else {
        toast.error("Cannot save. ID is undefined.");
      }
    } catch (error) {
      toast.error("Error saving data. Please try again.");
    }
  };

  //to handle the confirm delete click in the popup
  const confirmDelete = async () => {
    try {
      if (paramData && paramData.id) {
        if (!itemsExist) {
          dispatch(deleteReservationGroup(paramData.id));
          toast.success("Data deleted successfully");
          handleNavigate();
        } else {
          toast.error("Cannot delete group with items");
        }
      } else {
        toast.error("Cannot delete. ID is undefined.");
      }
    } catch (error) {
      toast.error("Error deleting data. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const navigateToCreate = () => {
    navigate("/reservationManagement/reservation/createReservationGroup");
  };

  const handleNavigate = () => {
    navigate("/reservationManagement/reservation/reservationGroups");
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
          <TitleActionBar
            Title={"Reservation Group Overview"}
            plustDisabled={isAddDisable}
            editDisabled={isEditDisable}
            saveDisabled={isSaveDisable}
            deleteDisabled={isDeleteDisable}
            PlusAction={() => {
              navigateToCreate();
            }}
            EditAction={() => {
              handleEdit();
            }}
            SaveAction={() => {
              handleSave();
            }}
            DeleteAction={() => {
              handleDelete();
            }}
          />

          <div>
            <Form>
              <TextField
                label="Group ID"
                className={`${!groupId ? "is-invalid" : ""}`}
                disabled
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
              <TextField
                label="Group Name"
                className={`${!groupName ? "is-invalid" : "bg-white"}`}
                value={groupName}
                disabled={isViewMode}
                onChange={(e) => setGroupName(e.target.value)}
                maxLength={20}
              />
            </Form>
          </div>

          <DeleteConfirmModel
            show={showConfirmation}
            close={cancelDelete}
            title={"Warning"}
            message={
              "The selected Reservation Group will be deleted. Do you wish to continue?"
            }
            type={"Yes"}
            action={() => {
              confirmDelete();
            }}
          />
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};
export default ManageReservationGroups;