import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const Dashboard = ({ data }) => {
  const [budgetData, setBudgetData] = useState([]);
  const [chartData, setChartData] = useState({});

  const fetchBudgetData = async () => {
    try {
      const { data } = await axios.get(`/api/budget/${data.userId}`); //Replace USER_ID dynamically
      setBudgetData(data);

      const categories = data.map(({ category }) => category);
      const amounts = data.map(({ amount }) => amount);

      setChartData({
        labels: categories,
        datasets: [
          {
            label: "Spending Trends",
            data: amounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  return (
    <div className="dashboard">
      <h1>{data.title}</h1>
      {chartData.labels ? <Bar data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default Dashboard;
