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
      <h2 className="font-bold text-2xl  mt-5">Transaction Analysis</h2>

      {/* Filter Buttons */}
      <div>
        {["today", "week", "month", "year"].map((range) => (
          <button
            key={range}
            onClick={() => filterTransactions(range)}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-5"
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Transaction Table */}
      <table className="table-auto mt-8 w-full border-collapse border border-gray-300 mb-7">
        <thead>
          <tr className="bg-gray-500 border border-gray-300">
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Amount (Ksh)</th>
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
            <tr className="border">
              <td colSpan="3" className="px-4 py-2 text-center">
                No transactions found for this period.
              </td>
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
