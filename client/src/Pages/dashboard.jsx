import React, { useState } from "react";
import Navbar from "../components/navbar";
import BudgetCategories from "../components/budgetcats";
import Transaction from "../components/transactions";

const Dashboard = () => {
  const [budgetData, setBudgetData] = useState(null);

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <BudgetCategories onComplete={(data) => setBudgetData(data)} />
      <Transaction />
    </div>
  );
};

export default Dashboard;
