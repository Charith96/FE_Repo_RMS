import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("", {
      state: { parentGroup: "Reservation Management" },
    });
  }, [navigate]);

  return <></>;
};

export default Dashboard;
