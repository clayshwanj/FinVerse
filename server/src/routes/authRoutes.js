import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  refreshToken,
  verifyEmail,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../database/models/user.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshToken);
router.get("/verify/:token", verifyEmail);

// Protect this route
router.get("/account", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
});

export default router;
