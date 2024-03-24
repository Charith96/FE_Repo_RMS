import React, { useState } from "react";
import TitleActionBar from "../../components/TitleActionsBar";
import TabStructure from "../../components/TabStructure";
import CustomerOverviewGeneral from "./CustomerOverviewGeneral";
import CustomerOverviewSecondTab from "./CustomerOverviewSecondTab";
import CustomerOverviewHistory from "./CustomerOverviewHistory";

const CustomerOverview = () => {
  const [toggleState, setToggleState] = useState(0);

  const tabs = [
    {
      name: "General",
      content: <CustomerOverviewGeneral />,
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
      />
    </>
  );
};

export default CustomerOverview;
