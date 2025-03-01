import express from "express";
import { SignupPage, LoginPage, logout } from "../controllers/userControl.js";
import SignupPage from "../../../client/src/Pages/signupPage.jsx";
import LoginPage from "../../../client/src/Pages/loginpage.jsx";

const router = express.Router();

router.post("/signupPage", SignupPage);
router.post("/loginpage", LoginPage);
router.post("/logout", logout);

export default router;
