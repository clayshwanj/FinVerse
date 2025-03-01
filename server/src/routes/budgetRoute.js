import express from "express";
import { addBudget, getBudgets } from "../controllers/budget.js";
import authMiddleware from "../middleware/server.js";

const router = express.Router();

router.post("/add", authMiddleware, addBudget);
router.get("/", authMiddleware, getBudgets);

export default router;
