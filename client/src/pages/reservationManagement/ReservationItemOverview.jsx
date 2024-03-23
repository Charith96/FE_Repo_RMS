import React, { useEffect, useState } from "react";
import { editReservationItem } from "../../store/actions/ReservationItemActions";
import { deleteReservationItem } from "../../store/actions/ReservationItemActions";
import { fetchReservationItemsById } from "../../store/actions/ReservationItemActions";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/TextField";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const ManageReservationItems = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchReservationItemData = useSelector(
    (state) => state.getReservationItemById.fetchReservationItemId
  );

  const [recordId, setRecordId] = useState("");
  const [itemId, setItemId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [itemName, setItemName] = useState("");
  const [noOfReservations, setNoOfReservations] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isViewMode, setIsViewMode] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [count, setCount] = useState(0);
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);
  const mode = state ? state.mode : "edit";

  useEffect(() => {
    if (paramData && recordId) {
      dispatch(fetchReservationItemsById(recordId));
    }
  }, [dispatch, recordId]);

  const fetchData = () => {
    if (fetchReservationItemData) {
      let filterData = fetchReservationItemData;
      if (filterData) {
        if (count === 0) {
          setItemId(filterData?.itemId ?? "");
          setGroupName(filterData?.reservationGroup ?? "");
          setItemName(filterData?.itemName ?? "");
          setNoOfReservations(filterData?.noOfReservations ?? "");
          setCapacity(filterData?.capacity ?? "");
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

  const handleSave = async () => {
    try {
      if (paramData && recordId) {
        const formData = {
          ...fetchReservationItemData,
          id: recordId,
          itemId: itemId,
          noOfReservations: noOfReservations,
          capacity: capacity,
        };
        console.log("formData ", recordId, formData);
        dispatch(editReservationItem(recordId, formData));
        //handleNavigate();
        toast.success("Data saved successfully");
      } else {
        toast.error("Cannot save. ID is undefined.");
      }
    } catch (error) {
      toast.error("Error saving data. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      if (paramData && paramData.id) {
        dispatch(deleteReservationItem(paramData.id));
        toast.success("Data deleted successfully");
        handleNavigate();
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
            Title={"Reservation Item Overview"}
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
                label="GroupName"
                className={`${!groupName ? "is-invalid" : ""}`}
                disabled
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <TextField
                label="ItemID"
                className={`${!itemId ? "is-invalid" : ""}`}
                disabled
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
              />
              <TextField
                label="ItemName"
                className={`${!itemName ? "is-invalid" : "bg-white"}`}
                value={itemName}
                disabled={isViewMode}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                label="No of Reservations"
                className={`${!noOfReservations ? "is-invalid" : "bg-white"}`}
                value={noOfReservations}
                disabled={isViewMode}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Regex pattern to match positive numbers including zero and asterisk
                  const regex = /^[0-9*]*$/;

                  // Check if the input matches the pattern
                  if (regex.test(inputValue)) {
                    if (inputValue === "*" || inputValue === "") {
                      setNoOfReservations(inputValue);
                    } else if (!isNaN(inputValue)) {
                      setNoOfReservations(parseInt(inputValue, 10));
                    } else {
                      setNoOfReservations("");
                    }
                  } else {
                    setNoOfReservations("");
                  }
                }}
              />
              <TextField
                label="Capacity"
                className={`${!capacity ? "is-invalid" : "bg-white"}`}
                value={capacity}
                disabled={isViewMode}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Regex pattern to match positive numbers including zero
                  const regex = /^(-|[0-9]+)$/;

                  // Check if the input matches the pattern
                  if (regex.test(inputValue)) {
                    if (inputValue === "-" || inputValue === "") {
                      setCapacity(inputValue);
                    } else {
                      setCapacity(parseInt(inputValue, 10));
                    }
                  } else {
                    setCapacity("");
                  }
                }}
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
export default ManageReservationItems;
