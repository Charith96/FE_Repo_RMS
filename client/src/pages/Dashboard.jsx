import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faUsers,
  faCalendarDays,
  faUser,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";
//import "./Dashboard.css"; // Make sure to create this CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);

      if (token) {
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        setUserName(`${firstName} ${lastName}`);
      }
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

  const handleRegister = () => {
    navigate("/register");
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to our Reservation Management System</h1>
      {isLoggedIn ? (
        <>
          <p>Hi, {userName} Welcome to Reservation Management System.</p>
          <div className="dashboard-icons">
            <div className="icon-item" onClick={() => navigateTo('/company')}>
              <FontAwesomeIcon icon={faBuilding} size="3x" />
              <p>Company Management</p>
            </div>
            <div className="icon-item" onClick={() => navigateTo('/customerManagement')}>
              <FontAwesomeIcon icon={faUsers} size="3x" />
              <p>Customer Management</p>
            </div>
            <div className="icon-item" onClick={() => navigateTo('/reservationManagement')}>
              <FontAwesomeIcon icon={faCalendarDays} size="3x" />
              <p>Reservation Management</p>
            </div>
            <div className="icon-item" onClick={() => navigateTo('/userManagement')}>
              <FontAwesomeIcon icon={faUser} size="3x" />
              <p>User Management</p>
            </div>
            <div className="icon-item" onClick={() => navigateTo('/rolesManagement')}>
              <FontAwesomeIcon icon={faUserShield} size="3x" />
              <p>Roles Management</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Please log in or register to access the dashboard.</p>
          <div className="auth-buttons-container">
            <div className="auth-buttons-container-login">
              <button
                className="auth-button login-button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="auth-buttons-container-register">
              <button
                className="auth-button register-button"
                type="button"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem('token');
//       setIsLoggedIn(!!token);

//       if (token) {
//         const firstName = localStorage.getItem('firstName');
//         const lastName = localStorage.getItem('lastName');
//         setUserName(`${firstName} ${lastName}`);
//       }
//     };

//     checkLoginStatus();

//     if (location.state?.loginSuccess) {
//       setIsLoggedIn(true);
//       // Clear the state to prevent issues on page refresh
//       window.history.replaceState({}, document.title)
//     }
//   }, [location]);

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleRegister = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Welcome to our Reservation Management System</h1>
//       {isLoggedIn ? (
//         <>
//           <p>Welcome, {userName}! Here's your dashboard content.</p>
//           {/* Add more dashboard content here */}
//         </>
//       ) : (
//         <>
//           <p>Please log in or register to access the dashboard.</p>
//           <div className="auth-buttons-container">
//             <div className="auth-buttons-container-login">
//               <button
//                 className="auth-button login-button"
//                 type="button"
//                 onClick={handleLogin}
//               >
//                 Login
//               </button>
//             </div>
//             <div className="auth-buttons-container-register">
//               <button
//                 className="auth-button register-button"
//                 type="button"
//                 onClick={handleRegister}
//               >
//                 Register
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;