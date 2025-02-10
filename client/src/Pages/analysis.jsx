import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import PieChart from "../components/piechart";
import BudgetSummary from "../components/budgetSum";

const Analysis = () => {
  const [transactions, setTransactions] = useState([]); // Ensure initial state is an array
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Filtered transactions
  const [filter, setFilter] = useState("month"); // Default filter

  // Fetch Transactions from Backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions");
        console.log("Fetched Transactions:", response.data); // Debugging log

        // Ensure response.data is an array, fallback to empty array if not
        setTransactions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]); // Prevents .filter error
      }
    };

    fetchTransactions();
  }, []);

  // Function to filter transactions
  const filterTransactions = (range) => {
    if (!Array.isArray(transactions)) return; // Ensure transactions is an array

    const now = new Date();
    let startDate;

    switch (range) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
        break;
      case "week":
        startDate = new Date();
        startDate.setDate(now.getDate() - 7); // Last 7 days
        break;
      case "month":
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1); // Last month
        break;
      case "year":
        startDate = new Date();
        startDate.setFullYear(now.getFullYear() - 1); // Last year
        break;
      default:
        startDate = null;
    }

    // Filter transactions based on date
    const filtered = transactions.filter((tx) => {
      const transactionDate = new Date(tx.date);
      return startDate ? transactionDate >= startDate : true;
    });

    setFilteredTransactions(filtered);
    setFilter(range);
  };

  // Ensure transactions array is always available
  useEffect(() => {
    filterTransactions(filter); // Apply default filter on first render
  }, [transactions]); // Runs when transactions change

  return (
    <div className="analysis">
      <Navbar />
      <h2>Transaction Analysis</h2>

      {/* Filter Buttons */}
      <div>
        {["today", "week", "month", "year"].map((range) => (
          <button
            key={range}
            onClick={() => filterTransactions(range)}
            style={{
              margin: "5px",
              padding: "10px",
              background: filter === range ? "#4CAF50" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Transaction Table */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount (Ksh)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx, index) => (
              <tr key={index}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.category}</td>
                <td>${tx.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No transactions found for this period.</td>
            </tr>
          )}
        </tbody>
      </table>

      <PieChart transactions={filteredTransactions} />
      <BudgetSummary transactions={filteredTransactions} />
    </div>
  );
};

export default Analysis;
