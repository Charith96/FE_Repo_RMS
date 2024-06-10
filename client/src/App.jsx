import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// auth
const Login = React.lazy(() => import('src/pages/auth/Login'));
const Register = React.lazy(() => import('src/pages/auth/Register'));
const ResetPassword = React.lazy(() => import('src/pages/auth/ResetPasswordPage'));
const ForgotPassword = React.lazy(() => import('src/pages/auth/ForgotPassword'));
const LogOut = React.lazy(() => import('src/pages/auth/LogoutPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/logout" name="Logout Page" element={<LogOut />} />
          <Route exact path="/reset-password" name="Reset Password Page" element={<ResetPassword />} />
          <Route exact path="/forgot-password" name="Forgot Password" element={<ForgotPassword />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
