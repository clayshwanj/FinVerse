import React, { useState, useEffect } from "react";
import api from "../axiosapi";

const BudgetSummary = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/budget/summary");
        const data = response.data;

        setTotalIncome(data.totalIncome);
        setTotalExpenses(data.totalExpenses);
        setRemainingBudget(data.balance);

        // Convert category breakdown object into an array
        const categoryData = Object.entries(data.categoryBreakdown).map(
          ([name, amount]) => ({ name, amount })
        );
        setCategories(categoryData);
      } catch (err) {
        console.error("Failed to fetch budget summary:", err);
        setError("Failed to load budget data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading budget data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Budget Summary</h2>
      <p>Total Income: Ksh{totalIncome}</p>
      <p>Total Expenses: Ksh{totalExpenses}</p>
      <p>Remaining Budget: Ksh{remainingBudget}</p>

      <h3>Expenses by Category</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category.name}: Ksh{category.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSummary;
