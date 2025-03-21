import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import icons
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error

    try {
      await axios.post("/auth/login", { email, password });
      navigate("/account");
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
      alert("Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded-2xl bg-white px-7 py-10">
        <h1 className="text-2xl font-bold">Login</h1>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

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
              onClick={() => setShowPassword(!showPassword)} // Toggle state
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
