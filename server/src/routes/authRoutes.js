import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  protectRoute,
  refreshToken,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshToken);
router.get("/verify/:token", verifyEmail);

// Protect this route
router.get("/dashboard", protectRoute, (req, res) => {
  res.json({ message: "Welcome to your dashboard!" });
});

export default router;
