import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../axiosapi";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ period }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("transactions/summary", {
          params: { period },
        });

        const data = response.data;
        const categories = Object.keys(data.categoryBreakdown);
        const amounts = Object.values(data.categoryBreakdown);

        setChartData({
          labels: ["Income", ...categories],
          datasets: [
            {
              label: "Amount (Ksh)",
              data: [data.totalIncome, ...amounts],
              backgroundColor: [
                "#4CAF50",
                "#FF5733",
                "#FFC300",
                "#3498DB",
                "#8E44AD",
                "#F39C12",
              ],
              borderColor: "#ddd",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  if (loading) return <p className="text-center">Loading chart...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4">
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default PieChart;
