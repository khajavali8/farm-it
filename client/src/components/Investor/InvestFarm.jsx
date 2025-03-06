import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import "../../styles/FarmITStyles.css";

const InvestFarm = () => {
  const [loans, setLoans] = useState([]);
  const [investment, setInvestment] = useState({ loanId: "", amount: "" });

  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/loans/available-loans",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loans:", error.response?.data || error.message);
      }
    };
    fetchLoans();
  }, []);

  const handleChange = (e) => {
    setInvestment({ ...investment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/loans/${investment.loanId}/invest`,
        { amount: investment.amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Investment successful!");
    } catch (error) {
      console.error(error);
      alert("Failed to invest");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Invest in a Farm</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="loanId"
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select a Loan</option>
          {loans.map((loan) => (
            <option key={loan._id} value={loan._id}>
              {loan.farm?.name || "Unknown Farm"} - {loan.farm?.location || "Unknown Location"} | RS-
              {loan.amount} | ID: {loan._id}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Investment Amount"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Invest
        </button>
      </form>

      <div style={styles.loanList}>
        <h3 style={styles.subHeading}>Loan Details</h3>
        {loans.length === 0 ? (
          <p style={styles.noLoans}>No available loans.</p>
        ) : (
          <div style={styles.loanGrid}>
            {loans.map((loan) => (
              <div key={loan._id} style={styles.loanCard}>
                <h3 style={styles.loanTitle}>Farm Name: {loan.farm?.name || "N/A"}</h3>
                <p><strong>Farm ID:</strong> {loan.farm?._id || "N/A"}</p>
                <p><strong>Location:</strong> {loan.farm?.location || "N/A"}</p>
                <p><strong>Loan ID:</strong> {loan._id}</p>
                <p><strong>Loan Amount:</strong> RS-{loan.amount}</p>
                <p><strong>Interest Rate:</strong> {loan.interestRate || "N/A"}%</p>
                <p><strong>Duration:</strong> {loan.duration || "N/A"} months</p>
                <p><strong>Status:</strong> {loan.status || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  loanList: {
    marginTop: "30px",
  },
  subHeading: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  loanGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "0 20px",
  },
  loanCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  loanCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
  },
  loanTitle: {
    fontSize: "1.25rem",
    color: "#007bff",
    marginBottom: "10px",
  },
  noLoans: {
    fontSize: "1rem",
    color: "#666",
  },
};

export default InvestFarm;