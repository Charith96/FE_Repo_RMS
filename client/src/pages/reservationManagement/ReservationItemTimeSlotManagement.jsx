import React, { useEffect, useState } from "react";
import { editReservationItem } from "../../store/actions/ReservationItemActions";
import { deleteReservationItem } from "../../store/actions/ReservationItemActions";
import { fetchReservationItemsById } from "../../store/actions/ReservationItemActions";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeSlotsByItemId } from "../../store/actions/ReservationItemActions";
import { editTimeSlotsByItemId } from "../../store/actions/ReservationItemActions";
import TabStructure from "../../components/TabStructure";
import ManageReservationItems from "./ReservationItemOverview";
import ReservationItemTimeSlotList from "./ReservationItemTimeSlotList";

const ReservationItemTimeSlotManagement = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const fetchReservationItemData = useSelector(
    (state) => state.getReservationItemById.fetchReservationItemId
  );
  const fetchTimeSlotsByItemIdData = useSelector(
    (state) => state.editTimeSlotsByItem.timeSlotsByItemId
  );
  const [recordId, setRecordId] = useState("");
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
  const [itemId, setItemId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [itemName, setItemName] = useState("");
  const [noOfReservations, setNoOfReservations] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isCustomized, setIsCustomized] = useState(false);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    if (paramData && recordId) {
      dispatch(fetchReservationItemsById(recordId));
      dispatch(fetchTimeSlotsByItemId(recordId));
      if (fetchReservationItemData.slotDurationType == "Customized") {
        setIsCustomized(true);
      } else {
        setIsCustomized(false);
      }
    }
  }, [dispatch, recordId]);

  useEffect(() => {
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
  }, [mode]);

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
        dispatch(editReservationItem(recordId, formData));

        const data = inputValues.map((value) => ({
          ...value,
          itemId: itemIdForTheTimeSlots,
        }));
        data.forEach((value) => {
          dispatch(editTimeSlotsByItemId(value.id, value));
        });

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

  // tab view content
  const tabs = [
    {
      name: "General",
      content: (
        <ManageReservationItems
          inputValues={inputValues}
          setInputValues={setInputValues}
          isCustomized={isCustomized}
          setIsCustomized={setIsCustomized}
          duration={duration}
          setDuration={setDuration}
          groupName={groupName}
          setGroupName={setGroupName}
          itemName={itemName}
          setItemName={setItemName}
          noOfReservations={noOfReservations}
          setNoOfReservations={setNoOfReservations}
          capacity={capacity}
          setCapacity={setCapacity}
          itemId={itemId}
          setItemId={setItemId}
        />
      ),
    },
    {
      name: "Time Slots",
      content: (
        <ReservationItemTimeSlotList
          inputValues={inputValues}
          setInputValues={setInputValues}
          isCustomized={isCustomized}
          setIsCustomized={setIsCustomized}
          duration={duration}
          setDuration={setDuration}
          isAdd={toggleState === 0 && isAdd ? isAdd : false}
          isEdit={toggleState === 0 && isEdit ? isEdit : false}
          isSave={toggleState === 0 && isSave ? isSave : false}
          isDelete={toggleState === 0 && isDelete}
          resetStates={() => handleReset()}
          setSelectedRecords={setSelectedRecords}
        />
      ),
    },
  ];

  return (
    <>
      <TitleActionBar
        Title={"Reservation Group List"}
        plustDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {
          handleCreate();
        }}
        EditAction={() => {}}
        SaveAction={() => {
          handleSave();
        }}
        DeleteAction={() => {
          handleDelete();
        }}
      />
      {/* tab view */}
      <TabStructure
        tabs={tabs}
        toggleState={toggleState}
        toggleTab={toggleTab}
      />
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
    </>
  );
};
