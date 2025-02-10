import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Income", "Rent", "Food", "Transport", "Entertainment"],
    datasets: [
      {
        label: "Amount (ksh)",
        data: [5000, 1500, 800, 400, 500], // Example data
        backgroundColor: [
          "#4CAF50",
          "#FF5733",
          "#FFC300",
          "#3498DB",
          "#8E44AD",
        ],
        borderColor: "#ddd",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
