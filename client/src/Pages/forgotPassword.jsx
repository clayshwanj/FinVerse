import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3005/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to send reset link. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleResetRequest}
        className="space-y-4 bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-box"
        />
        <button type="submit" className="btn-primary w-full">
          Send Reset Link
        </button>
        {message && <p className="text-sm text-green-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
