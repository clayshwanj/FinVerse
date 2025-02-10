// import React, { useState, useEffect } from "react";

// const BudgetSummary = () => {
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from backend API
//     const fetchBudgetData = async () => {
//       try {
//         const response = await fetch("https://your-api-url.com/budget");
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         setTotalIncome(data.totalIncome);
//         setTotalExpenses(data.totalExpenses);
//         setCategories(data.expensesByCategory);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBudgetData();
//   }, []);

//   const remainingBudget = totalIncome - totalExpenses;

//   if (loading) return <p>Loading budget data...</p>;
//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Budget Summary</h2>
//       <p>Total Income: Ksh{totalIncome}</p>
//       <p>Total Expenses: Ksh{totalExpenses}</p>
//       <p>Remaining Budget: Ksh{remainingBudget}</p>

//       <h3>Expenses by Category</h3>
//       <ul>
//         {categories.map((category, index) => (
//           <li key={index}>
//             {category.name}: Ksh{category.amount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BudgetSummary;

import React from "react";

const BudgetSummary = () => {
  const totalIncome = 5000; // Replace with actual data from backend/state
  const totalExpenses = 3500;
  const remainingBudget = totalIncome - totalExpenses;

  const categories = [
    { name: "Rent", amount: 1500 },
    { name: "Food", amount: 800 },
    { name: "Transport", amount: 400 },
    { name: "Entertainment", amount: 500 },
  ];

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
