import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-50">
        <h1 className="text-4xl font-bold">Welcome to Finverse</h1>
        <button type="submit" className="btn-primary w-30 rounded-4xl">
          <Link to="/loginpage">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
