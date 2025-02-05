import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;

// Routes
import userRoute from "./routes/userRoute.js";
import budgetRoute from "./routes/budgetRoute.js";

app.use("/api/users", userRoute);
app.use("/api/budget", budgetRoute);

app.get("/", (req, res) => {
  res.send("You have requested the home route with GET");
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
