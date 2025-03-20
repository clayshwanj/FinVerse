import Budget from "../database/models/budgetSchema.js";

const budgetController = {
  addBudget: async (req, res) => {
    if (!req.session.user)
      return res.status(401).json({ message: "Unauthorized" });

    try {
      const { category, amount } = req.body;
      const newBudget = new Budget({
        userId: req.session.user.id,
        category,
        amount,
      });
      await newBudget.save();
      res.status(201).json(newBudget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBudgets: async (req, res) => {
    if (!req.session.user)
      return res.status(401).json({ message: "Unauthorized" });

    try {
      const budgets = await Budget.find({ userId: req.session.user.id });
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default budgetController;
