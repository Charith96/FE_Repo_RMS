import React, { useEffect, useState, useRef } from "react";
import TitleActionBar from "../../components/TitleActionsBar";
import TabStructure from "../../components/TabStructure";
import { useLocation } from "react-router-dom";
import General from "./General";
import Roles from "./UserRoles";
import Company from "./UserCompany";

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
  const selectedRecords = useRef(0);
  const { state } = useLocation();
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);
  const mode = state ? state.mode : null;

  useEffect(() => {
    if (selectedRecords === 1 && disableEdit && !isEdit) {
      setDisableEdit(false);
      setDisableDelete(false);
    } else {
      setDisableEdit(true);
      setDisableDelete(true);
    }
  }, [isAdd, isEdit, isSave, isDelete, disableEdit, selectedRecords, data]);

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
      name: "General",
      content: <General value={paramData.id} mode={mode} />,
    },
    {
      name: "Companies",
      content: <Company value={paramData.id} />,
    },
    {
      name: "Roles",
      content: <Roles value={paramData.id} />,
    },
  ];

  return (
    <>
      <TitleActionBar
        Title={"User Overview"}
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

      <TabStructure
        tabs={tabs}
        toggleState={toggleState}
        toggleTab={toggleTab}
      />
    </>
  );
};

export default ReservationItemManagement;
