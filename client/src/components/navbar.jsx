import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex space-x-18 bg-sky-700 h-10 w-full">
      <h1 className="text-1xl font-bold mr-160">Finverse</h1>
      <Link to="/">Home</Link>
      <Link to="/account">Account</Link>
      <Link to="/dashboard">SetupBudget</Link>
      <Link to="/analysis">Analysis</Link>
    </nav>
  );
};

export default Navbar;
