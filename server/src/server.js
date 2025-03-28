import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import transactionRoutes from "./routes/transactionRoute.js";
import connectDB from "./database/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect Database
connectDB(process.env.MONGO_URI);

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/budget", budgetRoutes);
app.use("/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("You have requested the home route with GET");
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
