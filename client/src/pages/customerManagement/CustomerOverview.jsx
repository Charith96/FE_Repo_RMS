import React, { useState } from "react";
import TitleActionBar from "../../components/TitleActionsBar";
import TabStructure from "../../components/TabStructure";
import CustomerOverviewGeneral from "./CustomerOverviewGeneral";
import CustomerOverviewSecondTab from "./CustomerOverviewSecondTab";
import CustomerOverviewHistory from "./CustomerOverviewHistory";

const CustomerOverview = () => {
  const [toggleState, setToggleState] = useState(0);
  const [editOrDetailsClicked, setEditOrDetailsClicked] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);

  const tabs = [
    {
      name: "General",
      content: <CustomerOverviewGeneral selectedCustomerData={selectedCustomerData} editOrDetailsClicked={editOrDetailsClicked} />,
    },
    {
      name: "Current Reservations",
      content: <CustomerOverviewSecondTab />,
    },
    {
      name: "History",
      content: <CustomerOverviewHistory />,
    },
  ];

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleResetEditOrDetailsClicked = () => {
    setEditOrDetailsClicked(false);
  };

  return (
    <>
      <TitleActionBar
        Title={"Customer Overview"}
        plustDisabled={true}
        isEditHidden={false}
        isSaveHidden={false}
        isDeleteHidden={false}
        PlusAction={() => {}}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={() => {}}
      />

      <TabStructure
        tabs={tabs}
        toggleState={toggleState}
        toggleTab={toggleTab}
        onTabChange={handleResetEditOrDetailsClicked}
      />
    </>
  );
};

export default CustomerOverview;
