import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import PieChart from "../components/piechart";
import BudgetSummary from "../components/budgetSum";

const Analysis = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("month"); // Default filter
  const [summaryData, setSummaryData] = useState({}); // Holds budget summary data

  // Fetch Transactions and Summary from Backend
  const fetchData = async (range) => {
    try {
      const now = new Date();
      let startDate,
        endDate = new Date();

      switch (range) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date();
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate = new Date();
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          startDate = new Date();
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate = null;
      }

      const queryParams = startDate
        ? `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        : "";

      const transactionResponse = await axios.get(
        `/api/transactions${queryParams}`
      );
      const summaryResponse = await axios.get(`/api/summary${queryParams}`);

      console.log("Fetched Transactions:", transactionResponse.data);
      console.log("Fetched Summary:", summaryResponse.data);

      setTransactions(transactionResponse.data);
      setSummaryData(summaryResponse.data);
      setFilter(range);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTransactions([]);
      setSummaryData({});
    }
  };

  useEffect(() => {
    fetchData(filter); // Load default filter data
  }, []);

  return (
    <div className="analysis">
      <Navbar />
      <h2 className="font-bold text-2xl  mt-5">Transaction Analysis</h2>

      {/* Filter Buttons */}
      <div>
        {["today", "week", "month", "year"].map((range) => (
          <button
            key={range}
            onClick={() => fetchData(range)}
            className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-5 ${
              filter === range ? "bg-blue-700" : ""
            }`}
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
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <tr key={index}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.category}</td>
                <td>Ksh{tx.amount}</td>
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

      <PieChart transactions={transactions} summaryData={summaryData} />
      <BudgetSummary transactions={transactions} summaryData={summaryData} />
    </div>
  );
};

export default Analysis;
