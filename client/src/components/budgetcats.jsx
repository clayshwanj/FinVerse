import React, { useState } from "react";

const BudgetCategories = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetPeriod, setBudgetPeriod] = useState("");

  const categories = ["Food", "Rent", "Entertainment", "+"];

  // Handle Category Selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  // Handle Budget Amount Submission
  const handleBudgetAmountSubmit = (e) => {
    e.preventDefault();
    if (budgetAmount) {
      setStep(3);
    }
  };

  // Handle Budget Period Selection
  const handleBudgetPeriodSelect = (period) => {
    setBudgetPeriod(period);
    setStep(4);
  };

  // Handle Final Confirmation
  const handleConfirm = () => {
    const budgetData = {
      category: selectedCategory,
      amount: budgetAmount,
      period: budgetPeriod,
    };

    console.log("Budget Set:", budgetData);
    if (onComplete) {
      onComplete(budgetData);
    }
  };

  return (
    <div>
      <h2>Setup Budget</h2>

      {/* Step 1: Select Category */}
      {step === 1 && (
        <>
          <h3>Select a Category</h3>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              style={{ margin: "5px", padding: "10px" }}
            >
              {category}
            </button>
          ))}
        </>
      )}

      {/* Step 2: Enter Budget Amount */}
      {step === 2 && (
        <>
          <h3>Set Budget for {selectedCategory}</h3>
          <form onSubmit={handleBudgetAmountSubmit}>
            <input
              type="number"
              placeholder="Enter Budget Amount ($)"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              required
            />
            <button type="submit">Next</button>
          </form>
        </>
      )}

      {/* Step 3: Select Budget Period */}
      {step === 3 && (
        <>
          <h3>Select Budget Period</h3>
          {["Daily", "Weekly", "Monthly", "Yearly"].map((period) => (
            <button
              key={period}
              onClick={() => handleBudgetPeriodSelect(period)}
              style={{ margin: "5px", padding: "10px" }}
            >
              {period}
            </button>
          ))}
        </>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <>
          <h3>Confirm Budget Setup</h3>
          <p>
            <strong>Category:</strong> {selectedCategory}
          </p>
          <p>
            <strong>Amount:</strong> ${budgetAmount}
          </p>
          <p>
            <strong>Period:</strong> {budgetPeriod}
          </p>
          <button onClick={handleConfirm}>Confirm</button>
        </>
      )}
    </div>
  );
};

export default BudgetCategories;
