import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "../routes/userRoutes.js";
import budgetRoute from "../routes/budgetRoute.js";
import connectDB from "../database/db.js";

dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

dotenv.config(); // Load environment variables

// Middleware
app.use(express.json()); // Allows JSON parsing in requests

// Connect Database
connectDB();

// Routes
app.use("/api/users", userRoute);
app.use("/api/budget", budgetRoute);

app.get("/", (req, res) => {
  res.send("You have requested the home route with GET");
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
