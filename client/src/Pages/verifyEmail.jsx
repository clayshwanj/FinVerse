import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosapi";

const VerifyPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`auth/verify/${token}`);
        setMessage(response.data.message);
        setTimeout(() => navigate("/loginpage"), 3000);
      } catch (error) {
        setMessage("Invalid or expired token.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-lg font-bold">{message}</h2>
    </div>
  );
};

export default VerifyPage;
