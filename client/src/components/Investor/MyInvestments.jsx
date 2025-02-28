import React, { useEffect, useState } from "react";
import axios from "../../services/api";

const MyInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // Prevent API call if token is null

    const fetchInvestments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/loans/my-investments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Investments data:", response.data); // Debugging
        setInvestments(response.data);
      } catch (error) {
        console.error("Error fetching investments:", error.response?.data || error.message);
      }
    };

    fetchInvestments();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Investments</h2>
      {investments.length > 0 ? (
        <div style={styles.investmentGrid}>
          {investments.map((investment) => (
            <div key={investment._id} style={styles.investmentCard}>
              <h3 style={styles.farmName}>{investment.farmId?.name || "Unknown Farm"}</h3>
              <p><strong>Location:</strong> {investment.farmId?.location || "N/A"}</p>
              <p><strong>Investment Amount:</strong> RS-{investment.amount}</p>
              <p><strong>Status:</strong> {investment.status}</p>
              <p><strong>Loan ID:</strong> {investment.loan?._id || "N/A"}</p>
              <p><strong>Loan Amount:</strong> RS-{investment.loan?.amount || "N/A"}</p>
              <p><strong>Interest Rate:</strong> {investment.loan?.interestRate || "N/A"}%</p>
              <p><strong>Duration:</strong> {investment.loan?.duration || "N/A"} months</p>
              <p><strong>Date:</strong> {new Date(investment.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noInvestments}>No investments found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  investmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "0 20px",
  },
  investmentCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  investmentCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
  },
  farmName: {
    fontSize: "1.5rem",
    color: "#007bff",
    marginBottom: "10px",
  },
  noInvestments: {
    fontSize: "1rem",
    color: "#666",
  },
};

export default MyInvestments;