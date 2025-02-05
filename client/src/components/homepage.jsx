import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ data }) => {
  return (
    <div className="homepage">
      <h1>Welcome to Finverse</h1>
      <p>{data?.title}</p> <Link to="/register">Register</Link> |{" "}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
