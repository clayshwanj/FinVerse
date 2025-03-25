import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../database/models/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const JWT_VERIFICATION_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// Email Transport Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Verification Email
const sendVerificationEmail = async (user, email) => {
  const token = jwt.sign({ id: user._id, email }, JWT_VERIFICATION_SECRET, {
    expiresIn: "1d",
  });
  const verificationLink = `${BASE_URL}/auth/verify/${token}`;

  console.log({ verificationLink });

  await transporter.sendMail({
    from: `Finverse <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email - Finverse",
    html: `<h1>Welcome to Finverse!</h1>
           <p>Please verify your email by clicking the link below:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  });
};

// Generate Tokens
const generateAccessToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: "7d" });

// Signup Controller
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({
      name,
      email,
      password,
      isVerified: false,
    });
    await newUser.save();

    await sendVerificationEmail(newUser, email);

    res.status(201).json({
      message: "User registered successfully! Please verify your email.",
    });
  } catch (error) {
    console.log({ error });

    res.status(500).json({ message: "Error registering user" });
  }
};

// Email Verification Controller
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_VERIFICATION_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    if (!user.isVerified)
      return res
        .status(403)
        .json({ message: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("token", accessToken, COOKIE_OPTIONS);
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.json({ message: "Logged in successfully!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

// Refresh Token Endpoint
export const refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token missing" });

  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET);
    const accessToken = generateAccessToken(user);

    res.cookie("token", accessToken, COOKIE_OPTIONS);
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Logout Controller
export const logoutUser = (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  res.json({ message: "Logged out successfully" });
};
