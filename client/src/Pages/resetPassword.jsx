import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosapi";
const ResetPasswordPage = () => {
  const { token } = useParams(); // Capture token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(
        `http://localhost:3005/auth/reset-password/${token}`,
        {
          password: newPassword,
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/loginpage"), 2000);
    } catch (error) {
      setMessage("Reset failed. Token may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleReset}
        className="space-y-4 bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold">Reset Your Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="input-box"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input-box"
        />

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p className="text-sm text-green-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
