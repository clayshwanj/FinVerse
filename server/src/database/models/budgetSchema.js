import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true }
);
const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;
