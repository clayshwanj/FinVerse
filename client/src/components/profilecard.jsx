import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosapi";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/loginpage");

        const { data } = await api.get("auth/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Handle profile picture upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginpage");
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-500">{error}</h1>;

  return (
    <div className="flex flex-col items-center justify-center mt-16 px-6">
      {/* User Profile Section */}
      <div className="w-96 border rounded-2xl bg-white px-7 py-10 shadow-md">
        <h3 className="text-2xl font-semibold text-center mb-4">
          User Profile
        </h3>

        {/* Profile Picture Upload */}
        <div className="flex items-center justify-center mb-4">
          <label htmlFor="profileUpload" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300 overflow-hidden">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Add Photo</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* User Info */}
        <h1>Welcome, {user?.name}!</h1>
        <p>Email: {user?.email}</p>

        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Account Types
        </h2>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Home Account */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img
              src="/img/Home.jpg"
              alt="Home Account"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-sky-700">Home</h3>
              <p className="text-gray-600 mt-2">
                A personal account designed for everyday budgeting and savings.
              </p>
            </div>
          </article>

          {/* Office Account */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img
              src="/img/office.jpg"
              alt="Office Account"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-sky-700">Office</h3>
              <p className="text-gray-600 mt-2">
                Manage office expenses and track budgets with ease.
              </p>
            </div>
          </article>

          {/* Personal Account */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img
              src="\img\pexels-karolina-grabowska-4475523.jpg"
              alt="Personal Account"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-sky-700">Personal</h3>
              <p className="text-gray-600 mt-2">
                Your own financial management tool for personal use.
              </p>
            </div>
          </article>

          {/* Business Account */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img
              src="\img\pexels-anntarazevich-14751274.jpg"
              alt="Business Account"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-sky-700">Business</h3>
              <p className="text-gray-600 mt-2">
                A specialized account for small businesses and freelancers.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
