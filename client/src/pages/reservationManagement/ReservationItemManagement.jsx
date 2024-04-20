import React, { useEffect, useState } from "react";
import TitleActionBar from "../../components/TitleActionsBar";
import ReservationItemTimeSlot from "./ReservationItemTimeSlot";
import CreateReservationItem from "./CreateReservationItem";
import TabStructure from "../../components/TabStructure";

const ReservationItemManagement = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [toggleState, setToggleState] = useState(0);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [disableEdit, setDisableEdit] = useState(true);
  const [disableDelete, setDisableDelete] = useState(true);
  const [selectedRecords, setSelectedRecords] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [isCustomized, setIsCustomized] = useState(false);
  const [duration, setDuration] = useState("");
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [isValuesEqual, setIsValuesEqual] = useState(false);


  useEffect(() => {
    if (selectedRecords === 1 && disableEdit && !isEdit) {
      setDisableEdit(false);
      setDisableDelete(false);
    } else {
      setDisableEdit(true);
      setDisableDelete(true);
    }
  }, [isAdd, isEdit, isSave, isDelete, disableEdit, selectedRecords]);

  // handle tab view
  const toggleTab = (index) => {
    setToggleState(index);
    handleReset();
  };

  const handleReset = () => {
    setDisableAdd(false);
    setDisableEdit(true);
    setDisableSave(true);
    setDisableDelete(true);
    setIsSave(false);
    setIsAdd(false);
    setIsEdit(false);
    setIsDelete(false);
  };

  const handleAddClick = () => {
    setDisableAdd(true);
    setDisableEdit(true);
    setDisableSave(false);
    setIsAdd(true);
    setIsEdit(false);
    setIsDelete(false);
    setIsSave(false);
  };

  const handleEditClick = () => {
    setIsEdit(true);
    setIsAdd(false);
    setIsDelete(false);
    setIsSave(false);
    setDisableSave(false);
    setDisableAdd(true);
    setDisableEdit(true);
    setDisableDelete(true);
  };

  const handleSaveClick = () => {
    setIsSave(true);
    setIsDelete(false);
  };

  const handleshowDeleteModal = () => {
    setIsDelete(true);
    setIsAdd(false);
    setIsEdit(false);
    setIsSave(false);
  };

  // tab view content
  const tabs = [
    {
      name: "Item Basic Info",
      content: (
        <CreateReservationItem
          inputValues={inputValues}
          setInputValues={setInputValues}
          isCustomized={isCustomized}
          setIsCustomized={setIsCustomized}
          duration={duration}
          setDuration={setDuration}
          isOverlapping={isOverlapping}
          isValuesEqual={isValuesEqual}
          
        />
      ),
    },
    {
      name: "Time Slot Settings",
      content: (
        <ReservationItemTimeSlot
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
        Title={"Create Reservation Item"}
        isPlusHidden={true}
        isEditHidden={true}
        isSaveHidden={true}
        isDeleteHidden={true}
        saveDisabled={disableSave}
        editDisabled={disableEdit}
        plustDisabled={disableAdd}
        deleteDisabled={disableDelete}
        PlusAction={() => {
          handleAddClick();
        }}
        EditAction={() => {
          handleEditClick();
        }}
        SaveAction={() => {
          handleSaveClick();
        }}
        DeleteAction={() => {
          handleshowDeleteModal();
        }}
      />

      {/* tab view */}
      <TabStructure
        tabs={tabs}
        toggleState={toggleState}
        toggleTab={toggleTab}
      />
    </>
  );
};

export default ReservationItemManagement;
