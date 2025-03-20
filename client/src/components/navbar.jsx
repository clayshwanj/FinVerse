import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import api from "../axiosapi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      alert("Logged out!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed!");
    }
  };

  return (
    <nav className="bg-sky-700 w-full p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/img/logoF.jpg" alt="Finverse logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold text-black">Finverse</h1>
        </div>

        {/* Hamburger Menu Icon (visible on small screens) */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation (Hidden on Small Screens) */}
        <div className="hidden md:flex space-x-6">
          <Link className="text-black" to="/">
            Home
          </Link>
          <Link className="text-black" to="/account">
            Account
          </Link>
          <Link className="text-black" to="/dashboard">
            Setup Budget
          </Link>
          <Link className="text-black" to="/analysis">
            Analysis
          </Link>
        </div>
      </div>

      {/* Mobile Menu (Visible when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link
            className="text-white hover:underline"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-white hover:underline"
            to="/account"
            onClick={() => setIsOpen(false)}
          >
            Account
          </Link>
          <Link
            className="text-white hover:underline"
            to="/dashboard"
            onClick={() => setIsOpen(false)}
          >
            Setup Budget
          </Link>
          <Link
            className="text-white hover:underline"
            to="/analysis"
            onClick={() => setIsOpen(false)}
          >
            Analysis
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
