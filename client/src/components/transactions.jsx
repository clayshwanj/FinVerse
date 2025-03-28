import React, { useState, useEffect } from "react";
import api from "../axiosapi";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]); // Ensure transactions is an array
  const [summary, setSummary] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("expense"); // Default type to income
  const token = localStorage.getItem("token");

  // Fetch Transactions from Backend
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await api.get("transactions");
        setTransactions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await api.get("transactions/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(response.data);
      } catch (error) {
        console.error(
          "Error fetching summary:",
          error.response?.data || error.message
        );
      }
    };

    fetchTransactions();
    fetchSummary();
  }, []);

  // Handle Submit New Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = { category, amount, type };

    try {
      const response = await api.post("transactions/add", newTransaction, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions((prev) => [...prev, response.data]); // Update UI
      setShowForm(false);
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error(
        "Error adding transaction:",
        error.response?.data || error.message
      );
    }
  };

  // Handle Delete Transaction
  const handleDelete = async (id) => {
    try {
      await api.delete(`transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:");
    }
  };
  return (
    <div>
      {/* Transaction List */}
      {transactions.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount (Ksh)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.category}</td>
                <td>${tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions available.</p>
      )}

      {/* Add Transaction Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Add Transaction
      </button>

      {/* Transaction Form */}
      {showForm && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h3>New Transaction</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Amount (Ksh)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-40 mr-4"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="mr-5 p-2 border rounded"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mr-5 p-2 border rounded"
            >
              <option value="" disabled>
                Select Category
              </option>
              {type === "expense" ? (
                <>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Savings">Savings</option>
                  <option value="Other">Other</option>
                </>
              ) : (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Investment">Investment</option>
                </>
              )}
            </select>

            <button
              type="submit"
              className="bg-blue-600  hover:bg-green-500 text-white font-bold py-2 px-4 border-b-4 border-blue-500 hover:border-green-700  rounded"
            >
              Complete Transaction
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transaction;
