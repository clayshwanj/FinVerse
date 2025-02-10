import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Finverse</h1>
      <Link to="/">Home</Link>
      <Link to="/account">Account</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/analysis">Analysis</Link>
    </nav>
  );
};

export default Navbar;
