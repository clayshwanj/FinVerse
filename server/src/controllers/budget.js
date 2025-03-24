import Budget from "../database/models/budgetSchema.js";

const budgetController = {
  addBudget: async (req, res) => {
    try {
      const { category, amount, period } = req.body;
      const newBudget = new Budget({
        userId: req.user.id,
        category,
        amount,
        period,
      });
      await newBudget.save();
      res.status(201).json(newBudget);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  getBudgets: async (req, res) => {
    try {
      const budgets = await Budget.find({ userId: req.user.id });
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default budgetController;
