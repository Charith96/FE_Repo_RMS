import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import FormButton from "../components/AuthButtons";
//import AuthButtons from "../components/AuthButtons";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    if (location.state?.loginSuccess) {
      setIsLoggedIn(true);
      // Clear the state to prevent issues on page refresh
      window.history.replaceState({}, document.title)
    }
  }, [location]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/logout');
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to our Reservation Management System</h1>
      {isLoggedIn ? (
        <>
          <p>You are logged in. Here's your dashboard content.</p>
          <div className="auth-buttons-container">
            <button 
              className="auth-button logout-button" 
              type="button" 
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Please log in or register to access the dashboard.</p>
          <div className="auth-buttons-container">
            <button 
              className="auth-button login-button" 
              type="button" 
              onClick={handleLogin}
            >
              Login
            </button>
            <button 
              className="auth-button register-button" 
              type="button" 
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;



// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();
  
  

//   return <>
    
    
//   </>;
// };

// export default Dashboard;