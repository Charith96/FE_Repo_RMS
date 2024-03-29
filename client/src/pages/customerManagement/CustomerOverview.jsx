import React, { useState, useEffect } from "react";
import TitleActionBar from "../../components/TitleActionsBar";
import TabStructure from "../../components/TabStructure";
import CustomerOverviewGeneral from "./CustomerOverviewGeneral";
import CustomerOverviewSecondTab from "./CustomerOverviewSecondTab";
import CustomerOverviewHistory from "./CustomerOverviewHistory";
import { useLocation } from "react-router-dom";

const CustomerOverview = () => {
  const location = useLocation();
  const [toggleState, setToggleState] = useState(0);
  const [editOrDetailsClicked, setEditOrDetailsClicked] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.customerData) {
      setSelectedCustomerData(location.state.customerData);
      setEditOrDetailsClicked(location.state.editOrDetailsClicked);
    }
  }, [location.state]);

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
