import Transaction from "../database/models/transaction.js";

// Add new transaction
export const addTransaction = async (req, res) => {
  try {
    const { category, amount, type } = req.body;

    if (!category || !amount || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = new Transaction({
      userId: req.user.id,
      category,
      amount,
      type,
      date: Date.now(),
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Get summary
export const getSummary = async (req, res) => {
  try {
    const { startDate, endDate, limits = {} } = req.query;

    // Date filter setup (supports partial dates)
    const filter = { userId: req.user.id };
    if (startDate) filter.date = { $gte: new Date(startDate) };
    if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };

    const transactions = await Transaction.find(filter);

    // Summary calculations
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income")
          acc.totalIncome += transaction.amount;
        if (transaction.type === "expense")
          acc.totalExpenses += transaction.amount;

        // Track expenses by category
        if (transaction.type === "expense") {
          acc.categoryBreakdown[transaction.category] =
            (acc.categoryBreakdown[transaction.category] || 0) +
            transaction.amount;

          // Check for exceeded category limits
          if (
            limits[transaction.category] &&
            acc.categoryBreakdown[transaction.category] >
              limits[transaction.category]
          ) {
            acc.exceededCategories.push(transaction.category);
          }
        }

        return acc;
      },
      {
        totalIncome: 0,
        totalExpenses: 0,
        categoryBreakdown: {},
        exceededCategories: [],
      }
    );

    summary.balance = summary.totalIncome - summary.totalExpenses;

    //Reminder: Check for recurring expenses
    const recurringCategories = ["Rent", "Subscription", "Loan"]; // Customize this list
    summary.recurringReminders = recurringCategories.filter((category) =>
      transactions.some((t) => t.category === category && t.type === "expense")
    );

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
