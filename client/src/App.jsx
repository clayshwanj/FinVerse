import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/homepage.jsx";
import Account from "./Pages/account.jsx";
import Dashboard from "./Pages/dashboard.jsx";
import Analysis from "./Pages/analysis.jsx";
import LoginPage from "./Pages/loginpage.jsx";
import SignupPage from "./Pages/signupPage.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signupPage" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
