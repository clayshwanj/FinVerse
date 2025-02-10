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
    <div style={{ textAlign: "center" }}>
      <h3>User Profile</h3>

      {/* Profile Picture Upload */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <label htmlFor="profileUpload" style={{ cursor: "pointer" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #ccc",
              fontSize: "14px",
              color: "#555",
            }}
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "Add Photo"
            )}
          </div>
        </label>
        <input
          type="file"
          id="profileUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>

      <p>
        <strong>Name:</strong> John Doe
      </p>
      <p>
        <strong>Total Balance:</strong> Ksh5,000
      </p>
      <p>
        <strong>Account Types:</strong> Personal, Home, Office
      </p>
    </div>
  );
};

export default UserProfile;
