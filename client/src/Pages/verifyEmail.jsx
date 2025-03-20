import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosapi";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify/${token}`);
        setMessage(res.data.message);
      } catch (error) {
        setMessage("Verification failed. Link may be invalid or expired.");
      }
    };
    verify();
  }, [token]);

  return <div>{message}</div>;
};

export default VerifyEmail;
