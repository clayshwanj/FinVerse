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
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded-2xl bg-white px-7 py-10">
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
          <strong>Name:</strong> Jane Doe
        </p>
        <p>
          <strong>Email:</strong> janedoe@gmail.com
        </p>
        <p>
          <strong>Total Balance:</strong> Ksh5,000
        </p>
        <p>
          <strong>Account Types:</strong> Personal, Home, Office
        </p>
      </div>
    </div>
  );
};

export default UserProfile;

// import React, { useState, useEffect } from "react";

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     totalBalance: 0,
//     accountTypes: [],
//     profilePic: null,
//   });

//   useEffect(() => {
//     // Fetch user data from backend API
//     fetch("https://api.example.com/user-profile") // Replace with your actual API endpoint
//       .then((response) => response.json())
//       .then((data) => {
//         setUser({
//           name: data.name,
//           email: data.email,
//           totalBalance: data.totalBalance,
//           accountTypes: data.accountTypes,
//           profilePic: data.profilePic, // Assumes backend provides an image URL
//         });
//       })
//       .catch((error) => console.error("Error fetching user data:", error));
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUser((prevUser) => ({
//         ...prevUser,
//         profilePic: URL.createObjectURL(file),
//       }));
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h3>User Profile</h3>

//       {/* Profile Picture Upload */}
//       <div style={{ position: "relative", display: "inline-block" }}>
//         <label htmlFor="profileUpload" style={{ cursor: "pointer" }}>
//           <div
//             style={{
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%",
//               overflow: "hidden",
//               backgroundColor: "#f0f0f0",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "2px dashed #ccc",
//               fontSize: "14px",
//               color: "#555",
//             }}
//           >
//             {user.profilePic ? (
//               <img
//                 src={user.profilePic}
//                 alt="Profile"
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             ) : (
//               "Add Photo"
//             )}
//           </div>
//         </label>
//         <input
//           type="file"
//           id="profileUpload"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={handleImageUpload}
//         />
//       </div>

//       <p>
//         <strong>Name:</strong> {user.name}
//       </p>
//       <p>
//         <strong>Email:</strong> {user.email}
//       </p>
//       <p>
//         <strong>Total Balance:</strong> Ksh{user.totalBalance}
//       </p>
//       <p>
//         <strong>Account Types:</strong> {user.accountTypes.join(", ")}
//       </p>
//     </div>
//   );
// };

// export default UserProfile;
