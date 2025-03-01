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
      {/* Step 1: Select Category */}
      {step === 1 && (
        <>
          <h3>Select a Category</h3>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-5"
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
              placeholder="Enter Budget Amount (Ksh)"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              required
              className="w-55 mr-5"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Next
            </button>
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
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-10"
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
          <button
            onClick={handleConfirm}
            className="bg-blue-600  hover:bg-green-500 text-white font-bold py-2 px-4 border-b-4 border-blue-500 hover:border-green-700  rounded"
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default BudgetCategories;
