import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const getEmail = localStorage.getItem("email");
  const getPassword = localStorage.getItem("password");

  

  return <>
  <p>email: {getEmail}</p>
  <p>password: {getPassword}</p>
  </>;
};

export default Dashboard;
