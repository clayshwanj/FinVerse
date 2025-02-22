import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userControl.js";

const router = express.Router();

// API Routes
router.post("/users", createUser); // Create a user
router.get("/users", getUsers); // Get all users
router.put("/users/:id", updateUser); // Update user by ID
router.delete("/users/:id", deleteUser); // Delete user by ID

export default router;

// import express from "express";
// import { signUp } from "../controllers/userControl";

// const router = express.Router();

// // Register User
// router.post("/signupPage", signUp);

// // Login User
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await user.findOne({ email });
//   if (user && user.password === password) {
//     res.json(user);
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// });

// export default router;
