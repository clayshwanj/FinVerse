import Budget from "../database/models/budgetSchema.js";

const budgetController = {
  addBudget: async (req, res) => {
    try {
      const { category, amount, period } = req.body;

      if (!category || !amount || !period) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newBudget = new Budget({
        userId: req.user.id,
        category,
        amount,
        period: period.toLowerCase(),
      });
      await newBudget.save();
      res.status(201).json(newBudget);
    } catch (error) {
      console.log({ error });

      res.status(500).json({ message: "Server error", error: error.message });
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
