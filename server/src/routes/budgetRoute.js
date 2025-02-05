import express from "express";
import Budget from "../controllers/Budget.js";

const router = express.Router();

// Add Budget Item
router.post("/", async (req, res) => {
  try {
    const newBudget = await Budget.create(req.body);
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch Budget Data
router.get("/:userId", async (req, res) => {
  try {
    const budgetData = await Budget.find({ userId: req.params.userId });
    res.json(budgetData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
