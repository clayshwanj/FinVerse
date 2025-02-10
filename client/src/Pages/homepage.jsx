import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
// import BarChart from "../components/barchart";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <h1>Welcome to Finverse</h1>
      <Link to="/signupPage">Sign up</Link> | <Link to="/loginpage">Login</Link>
    </div>
  );
};

export default HomePage;
