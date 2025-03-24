import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  refreshToken,
  verifyEmail,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshToken);
router.get("/verify/:token", verifyEmail);

// Protect this route
router.get("/account", authMiddleware, (req, res) => {
  console.log(req.user.id);

  res.json({ message: "Welcome to you Finverse!" });
});

export default router;
