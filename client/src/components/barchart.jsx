import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Income", "Rent", "Food", "Transport", "Entertainment"],
    datasets: [
      {
        label: "Amount ($)",
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Budget Overview",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
