import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Spinner } from "react-bootstrap"; // For a loading spinner

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TransactionAnalytics = () => {
  // State to store analytics data
  const [analytics, setAnalytics] = useState({ investments: [], repayments: [] });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
  
        const response = await axios.get("/transactions/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Analytics response:", response.data); // Log the response
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setError(error.message || "Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnalytics();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spinner animation="border" role="status" />
        <p>Loading analytics...</p>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // Prepare data for the chart
  const investmentData = analytics.investments.map((inv) => inv.totalAmount);
  const repaymentData = analytics.repayments.map((rep) => rep.totalAmount);
  const months = analytics.investments.map((inv) => `Month ${inv._id}`);

  // Log the chart data for debugging
  console.log("Investment Data:", investmentData);
  console.log("Repayment Data:", repaymentData);
  console.log("Months:", months);

  // Chart data configuration
  const chartData = {
    labels: months, // X-axis labels (months)
    datasets: [
      {
        label: "Investments", // Dataset label
        data: investmentData, // Y-axis data (investments)
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
      },
      {
        label: "Repayments", // Dataset label
        data: repaymentData, // Y-axis data (repayments)
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Bar color
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Monthly Investments and Repayments", // Chart title
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2>Transaction Analytics</h2>
      <div style={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} /> {/* Render the chart */}
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  chartContainer: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
  },
  errorContainer: {
    textAlign: "center",
    padding: "20px",
  },
};

export default TransactionAnalytics;