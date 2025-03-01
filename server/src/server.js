import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import budgetRoute from "./routes/budgetRoute.js";
import connectDB from "./database/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Set secure: true in production
  })
);

// Connect Database
connectDB();

// Routes
app.use("/api/users", userRoute);
app.use("/api/budget", budgetRoute);

app.get("/", (req, res) => {
  res.send("You have requested the home route with GET");
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
