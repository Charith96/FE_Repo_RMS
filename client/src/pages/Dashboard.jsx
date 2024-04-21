import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/company", {
      state: { parentGroup: "Company" },
    });
  }, [navigate]);

  return <></>;
};

export default Dashboard;
