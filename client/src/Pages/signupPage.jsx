import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { FaRegEye, FaRegEyeSlash } from "react-icons";
import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { name, email, password });
      navigate("/dashboard"); // Redirect after successful signup
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex items items-center justify-center mt-28">
      <div className="w-96 border rounded-2xl bg-white px-7 py-10">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-box"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-box"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-box"
          />

          <button type="submit" className="btn-primary ">
            Create Account
          </button>
          <p>
            Already have an account?{""}
            <Link
              to="/loginpage"
              className="font-medium text-blue-400 underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

{
  /* {isShowPassword ? (
            <FaRegEye
              size={20}
              className="text-blue-400 cursor-pointer"
              onClick
              {...() => toggleShowPassword()}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick
              {...() => toggleShowPassword()}
            />
          )} */
}
