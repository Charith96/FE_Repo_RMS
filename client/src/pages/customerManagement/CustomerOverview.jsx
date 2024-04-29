import React, { useState, useEffect } from "react";
import TabStructure from "../../components/TabStructure";
import CustomerOverviewGeneral from "./CustomerOverviewGeneral";
import CustomerCurrentReservations from "./CustomerCurrentReservations";
import CustomerReservationHistory from "./CustomerReservationHistory";
import { useLocation } from "react-router-dom";

const CustomerOverview = () => {
  const [toggleState, setToggleState] = useState(0);
  const { state } = useLocation();
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);

  //Tabs
  const tabs = [
    {
      name: "General",
      content: paramData ? (
        <CustomerOverviewGeneral
          customer={paramData}
          mode={state && state.mode}
        />
      ) : null,
    },
    {
      name: "Current Reservations",
      content:
        paramData?.email === "hasinichamodi4@gmail.com" ? (
          <CustomerCurrentReservations email={paramData?.email} />
        ) : (
          <p>No reservations found for this customer.</p>
        ),
    },
    {
      name: "History",
      content:
        paramData?.email === "hasinichamodi4@gmail.com" ? (
          <CustomerReservationHistory email={paramData?.email} />
        ) : (
          <p>No reservations found for this customer.</p>
        ),
    },
  ];

  return (
    <>
      <TabStructure
        tabs={tabs}
        toggleState={toggleState}
        toggleTab={setToggleState}
      />
    </>
  );
};

export default CustomerOverview;
