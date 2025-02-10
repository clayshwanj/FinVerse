import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]); // Ensure transactions is an array
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");

  // Fetch Transactions from Backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions");
        console.log("Fetched transactions:", response.data); // Debugging

        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setTransactions([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]); // Fallback to empty array on error
      }
    };

    fetchTransactions();
  }, []);

  // Handle Submit New Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      amount,
      category,
      phone,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post("/api/transactions", newTransaction);
      setTransactions((prev) => [...prev, response.data]); // Update UI
      setShowForm(false);
      setAmount("");
      setCategory("");
      setPhone("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>

      {/* Transaction List */}
      {transactions.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount ($)</th>
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
        style={{ marginTop: "10px", padding: "10px" }}
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
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category (Food, Rent, etc.)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit">Complete Transaction</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transaction;
