import React, { useState, useEffect } from "react";
import TabStructure from "../../components/TabStructure";
import CustomerOverviewGeneral from "./CustomerOverviewGeneral";
import CustomerCurrentReservations from "./CustomerCurrentReservations";
import CustomerReservationHistory from "./CustomerReservationHistory";
import { useLocation } from "react-router-dom";

const CustomerOverview = () => {
  // State to manage the active tab
  const [toggleState, setToggleState] = useState(0);
  // Get the state and search parameters from the URL
  const { state } = useLocation();
  const searchParams = new URLSearchParams(useLocation().search);
  // Extract data from the search parameters and parse it as JSON
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);

  // Define tabs with their respective content
  const tabs = [
    {
      name: "General",
      // Render CustomerOverviewGeneral component with customer data if available
      content: paramData ? (
        <CustomerOverviewGeneral
          customer={paramData}
          mode={state && state.mode}
        />
      ) : null,
    },
    {
      name: "Current Reservations",
      // Render CustomerCurrentReservations component if customer email matches a specific value
      content:
        paramData?.email === "hasinichamodi4@gmail.com" ? (
          <CustomerCurrentReservations email={paramData?.email} />
        ) : (
          <p>No reservations found for this customer.</p>
        ),
    },
    {
      name: "History",
      // Render CustomerReservationHistory component if customer email matches a specific value
      content:
        paramData?.email === "hasinichamodi4@gmail.com" ? (
          <CustomerReservationHistory email={paramData?.email} />
        ) : (
          <p>No reservations found for this customer.</p> // Render a message if no reservations found for this customer
        ),
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

export default CustomerOverview;