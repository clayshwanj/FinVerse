import express from "express";
import budgetController from "../controllers/budget.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, budgetController.addBudget);
router.get("/", authMiddleware, budgetController.getBudgets);

export default router;
