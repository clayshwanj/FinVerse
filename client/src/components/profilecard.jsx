import React, { useState } from "react";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

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

        <p>
          <strong>Name:</strong> Jane Doe
        </p>
        <p>
          <strong>Email:</strong> janedoe@gmail.com
        </p>
      </div>

      {/* Total Balance Section */}
      <div className="w-96 border rounded-2xl bg-white px-7 py-5 shadow-md mt-6">
        <h3 className="text-xl font-semibold text-center text-green-700">
          Total Balance
        </h3>
        <p className="text-center text-gray-700 text-lg font-medium mt-2">
          Ksh 5,000
        </p>
      </div>

      {/* Account Types Section */}
      <section
        id="products"
        className="py-16 bg-gray-100 px-6 md:px-16 w-full mt-8"
      >
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
                  A personal account designed for everyday budgeting and
                  savings.
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
      </section>
    </div>
  );
};

export default UserProfile;
