import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/homepage.jsx";
import Account from "./Pages/account.jsx";
import Dashboard from "./Pages/dashboard.jsx";
import Analysis from "./Pages/analysis.jsx";
import LoginPage from "./Pages/loginpage.jsx";
import SignupPage from "./Pages/signupPage.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import VerifyPage from "./Pages/verifyEmail.jsx";
import ForgotPasswordPage from "./Pages/forgotPassword.jsx";
import ResetPasswordPage from "./Pages/resetPassword.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signupPage" element={<SignupPage />} />
        <Route path="/auth/verify/:token" element={<VerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          {/* Protected Routes */}
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
