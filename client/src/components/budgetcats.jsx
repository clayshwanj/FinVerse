import React, { useState } from "react";
import axios from "axios";

const BudgetCategories = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetPeriod, setBudgetPeriod] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Food",
    "Rent",
    "Entertainment",
    "+",
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Category Selection
  const handleCategorySelect = (category) => {
    if (category === "+") {
      setStep("newCategory"); // Go to add new category step
    } else {
      setSelectedCategory(category);
      setStep(2);
    }
  };

  // Handle New Category Submission
  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      try {
        const response = await axios.post("/budget/add", {
          category: newCategory,
        });
        setCategories([...categories.slice(0, -1), newCategory, "+"]);
        setSelectedCategory(newCategory);
        setStep(2);
      } catch (error) {
        console.error("Failed to add category", error);
      }
    }
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
  const handleConfirm = async () => {
    const budgetData = {
      category: selectedCategory,
      amount: budgetAmount,
      period: budgetPeriod,
    };

    try {
      setLoading(true);
      setErrorMessage("");
      const response = await axios.post("/budget/add", budgetData, {
        withCredentials: true,
      });

      console.log("Budget saved:", response.data);
      setSuccessMessage("Budget saved successfully!");

      if (onComplete) onComplete(response.data);
    } catch (error) {
      console.error("Failed to save budget:", error);
      setErrorMessage("Failed to save budget. Please try again.");
    } finally {
      setLoading(false);
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

      {/* New Category Step */}
      {step === 1.5 && (
        <>
          <h3>Add a New Category</h3>
          <form onSubmit={handleNewCategorySubmit}>
            <input
              type="text"
              placeholder="Enter New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
              className="w-55 mr-5"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Add Category
            </button>
          </form>
          <button
            onClick={() => setStep(1)}
            className="mt-2 text-red-500 underline"
          >
            Cancel
          </button>
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
            <strong>Amount:</strong> Ksh{budgetAmount}
          </p>
          <p>
            <strong>Period:</strong> {budgetPeriod}
          </p>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-green-500"
            } text-white font-bold py-2 px-4 border-b-4 border-blue-500 hover:border-green-700 rounded`}
          >
            {loading ? "Saving..." : "Confirm"}
          </button>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetCategories;
