import React, { useEffect, useState } from "react";
import { editReservationItem } from "../../store/actions/ReservationItemActions";
import { deleteReservationItem } from "../../store/actions/ReservationItemActions";
import { fetchReservationItemsById } from "../../store/actions/ReservationItemActions";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeSlotsByItemId } from "../../store/actions/ReservationItemActions";
import { editTimeSlotsByItemId } from "../../store/actions/ReservationItemActions";
import { createTimeSlots } from "../../store/actions/ReservationItemActions";
import { deleteTimeSlotsByItemId } from "../../store/actions/ReservationItemActions";
import TabStructure from "../../components/TabStructure";
import ManageReservationItems from "./ReservationItemOverview";
import ReservationItemTimeSlotList from "./ReservationItemTimeSlotList";
import { toast } from "react-toastify";

const ReservationItemTimeSlotManagement = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const fetchReservationItemData = useSelector(
    (state) => state.getReservationItemById.fetchReservationItemId
  );
  const fetchTimeSlotsByItemIdData = useSelector(
    (state) => state.getTimeSlotsByItem.timeSlotsByItemId
  );
  const [recordId, setRecordId] = useState("");
  const [isViewMode, setIsViewMode] = useState(false);

  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [count, setCount] = useState(0);
  const [toggleState, setToggleState] = useState(0);

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
  const [duration, setDuration] = useState("00:00");
  const [noOfSlots, setNoOfSlots] = useState("");
  const [noOfAddedSlots, setNoOfAddedSlots] = useState(0);
  const [newlyAddedSlots, setNewlyAddedSlots] = useState([]);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [isValuesEqual, setIsValuesEqual] = useState(false);

  useEffect(() => {
    setNoOfAddedSlots(parseInt(noOfSlots, 10)); // Update noOfAddedSlots when noOfSlots changes

    
  }, [noOfSlots]);

  useEffect(() => {
    if (paramData && recordId) {
      dispatch(fetchReservationItemsById(recordId));
      dispatch(fetchTimeSlotsByItemId(recordId));
      if (fetchReservationItemData.slotDurationType === "Customized") {
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

  // handle tab view
  const toggleTab = (index) => {
    setToggleState(index);
    //handleReset();
  };

  const fetchData = () => {
    if (fetchReservationItemData) {
      let filterData = fetchReservationItemData;
      if (filterData) {
        if (count === 0) {
          setItemId(filterData?.itemId ?? "");
          setGroupName(filterData?.reservationGroup ?? "");
          setItemName(filterData?.itemName ?? "");
          setNoOfSlots(filterData?.noOfSlots ?? "");
          setNoOfReservations(filterData?.noOfReservations ?? "");
          setCapacity(filterData?.capacity ?? "");
          setDuration(filterData?.duration ?? "00:00");
          setInputValues(fetchTimeSlotsByItemIdData);
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
        //handleNavigate();
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

  const handleSave = async () => {
    var flagNew = true;
    var flagOld = true;
    try {
      if (paramData && recordId) {
        const formData = {
          ...fetchReservationItemData,
          id: recordId,
          itemId: itemId,
          itemName: itemName,
          noOfSlots: inputValues.length,
          noOfReservations: noOfReservations,
          capacity: capacity,
        };
        if (inputValues.length > 0) {
          inputValues.forEach((value) => {
            if (
              value.startTime === "NaN:NaN" ||
              value.endTime === "NaN:NaN" ||
              value.startTime === "" ||
              value.endTime === ""
            ) {
              flagOld = false;
            }
            if (newlyAddedSlots.length > 0) {
              newlyAddedSlots.forEach((value) => {
                if (
                  value.startTime === "NaN:NaN" ||
                  value.endTime === "NaN:NaN" ||
                  value.startTime === "" ||
                  value.endTime === ""
                ) {
                  flagNew = false;
                }
              });
            }
          });
        }

        if (
          itemName &&
          noOfReservations &&
          capacity &&
          flagOld &&
          flagNew &&
          !isOverlapping &&
          !isValuesEqual
        ) {
          dispatch(editReservationItem(recordId, formData));

          
          const data = inputValues.map((value) => ({
            ...value,
          }));
          data.forEach((value) => {
            dispatch(editTimeSlotsByItemId(value.id, value));
          });

          const dataNew = newlyAddedSlots.map((value) => ({
            ...value,
          }));
          dataNew.forEach((value) => {
            dispatch(createTimeSlots(value));
          });

          toast.success("Data saved successfully");
        } else {
          if (isOverlapping) {
            toast.error("Time slots are overlapping");
          } else if (isValuesEqual) {
            toast.error("Start time and end time cannot be equal");
          } else {
            toast.error("Please fill all the required fields");
          }
        }
      } else {
        toast.error("Cannot save. ID is undefined.");
      }
    } catch (error) {
      toast.error("Error saving data. Please try again.");
    }
  };

  //handle delete click
  const confirmDelete = async () => {
    try {
      if (paramData && paramData.id) {
        dispatch(deleteReservationItem(paramData.id));
        fetchTimeSlotsByItemIdData.forEach((value) => {
          dispatch(deleteTimeSlotsByItemId(value.id));
        });
        toast.success("Data deleted successfully");
        //handleNavigate();
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

  /*const navigateToCreate = () => {
    navigate("/reservationManagement/reservation/createReservationGroup");
  };

  const handleNavigate = () => {
    navigate("/reservationManagement/reservation/reservationGroups");
  };*/

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
          noOfSlots={noOfSlots}
          setNoOfSlots={setNoOfSlots}
          noOfAddedSlots={noOfAddedSlots}
          setNoOfAddedSlots={setNoOfAddedSlots}
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
          noOfSlots={noOfSlots}
          setNoOfSlots={setNoOfSlots}
          uniqueId={paramData.id}
          itemId={itemId}
          newlyAddedSlots={newlyAddedSlots}
          setNewlyAddedSlots={setNewlyAddedSlots}
          isOverlapping={isOverlapping}
          setIsOverlapping={setIsOverlapping}
          isValuesEqual={isValuesEqual}
          setIsValuesEqual={setIsValuesEqual}
        />
      ),
    },
  ];

  return (
    <>
      <TitleActionBar
        Title={"Reservation Item Overview"}
        plustDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {}}
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
export default ReservationItemTimeSlotManagement;
