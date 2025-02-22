import React, { useState } from "react";
import Navbar from "../components/navbar";
import BudgetCategories from "../components/budgetcats";
import Transaction from "../components/transactions";

const Dashboard = () => {
  const [budgetData, setBudgetData] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="grid grid-flow-col grid-rows-2 gap-2">
        <h2 className="font-bold text-2xl  mt-5">Setup Budget</h2>
        <BudgetCategories onComplete={(data) => setBudgetData(data)} />
        <h2 className="font-bold text-2xl  mt-5">Transactions</h2>
        <Transaction />
      </div>
    </div>
  );
};

export default Dashboard;
