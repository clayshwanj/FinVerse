import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]); // Ensure transactions is an array
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token");

  // Fetch Transactions from Backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await axios.get("/api/transactions/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:");
      }
    };

    fetchTransactions();
    fetchSummary();
  }, [token]);

  // Handle Submit New Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = { category, amount };

    try {
      const response = await axios.post(
        "/api/transactions/add",
        newTransaction,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions((prev) => [...prev, response.data]); // Update UI
      setShowForm(false);
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error("Error adding transaction:");
    }
  };

  // Handle Delete Transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`, {
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
            <input
              type="text"
              placeholder="Category (Food, Rent, etc.)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mr-5"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mr-5"
            />
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
