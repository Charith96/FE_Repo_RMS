import React, { useState, useEffect } from "react";
import TabStructure from "../../components/TabStructure";
import General from "./General";
import ItemInformation from "./ItemInformation";
import { useLocation } from "react-router-dom";

const ReservationOverview = () => {
  const [toggleState, setToggleState] = useState(0);
  const [disableEdit, setDisableEdit] = useState(true);
  // Extracting data from the URL
  const { state } = useLocation();
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);

  // tabs with their corresponding content
  const tabs = [
    {
      name: "General",
      content: paramData ? (
        <General reservationData={paramData} mode={state && state.mode} />
      ) : null,
    },
    {
      name: "Item Information",
      content: paramData ? (
        <ItemInformation
          reservationData={paramData}
          mode={state && state.mode}
          setDisableEdit={setDisableEdit}
        />
      ) : null,
    },
  ];

  return (
    <>
     {/*Render TabStructure component with tabs and toggleState */}
      <TabStructure
        tabs={tabs}
        toggleState={toggleState}
        toggleTab={setToggleState}
      />
    </>
  );
};

export default ReservationOverview;