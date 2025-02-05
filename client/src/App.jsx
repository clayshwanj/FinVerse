import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage.jsx";
import Dashboard from "./components/dashboard.jsx";
import Barchart from "./components/barchart.jsx";
import clientData from "./client.js";

const App = () => {
  return (
    <Router>
      <div className="container">
        {clientData?.map((user) => (
          <div key={user.id} className="product">
            <Dashboard data={user.dashboard} />
            <HomePage data={user.homepage} />
            <Barchart data={user.barchart} />
          </div>
        ))}
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
