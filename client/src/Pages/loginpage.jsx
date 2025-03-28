import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import icons
import api from "../axiosapi";

const LoginPage = () => {
  // Get logout value from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const logout = urlParams.get("logout");
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (logout) {
      setShowLogoutMessage(true);
      setTimeout(() => {
        setShowLogoutMessage(false);
      }, 5000); // Hide message after 3 seconds
    }
  }, [logout]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("auth/login", {
        email,
        password,
      });

      navigate("/account");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded-2xl bg-white px-7 py-10 space-y-3">
        <h1 className="text-2xl font-bold">Login</h1>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* Logout Message */}
        {showLogoutMessage && (
          <p className="text-green-500 text-sm">
            Successfully logged out. Please log in again.
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-box"
            autoFocus
            autoComplete="email"
          />

          {/* Password Input with Eye Icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-box pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <p className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          {/* Login Button with Loading State */}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Not registered yet?{" "}
          <Link
            to="/signupPage"
            className="font-medium text-blue-400 underline"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
