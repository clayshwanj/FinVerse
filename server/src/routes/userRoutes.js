import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userControl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// API Routes
router.post("/users", createUser); // Create a user
router.get("/users", getUsers); // Get all users
router.put("/users/:id", updateUser); // Update user by ID
router.delete("/users/:id", deleteUser); // Delete user by ID

// Protected route
router.get("/account", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, ${req.session.user.username}!` });
});
export default router;
