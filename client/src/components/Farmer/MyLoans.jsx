import React, { useEffect, useState } from "react";
import axios from "../../services/api";
// import "../../styles/FormStyles.css";
import "../../styles/FarmITStyles.css";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [error, setError] = useState("");
  const [repaymentAmounts, setRepaymentAmounts] = useState({}); 
  const [showRepayLoan, setShowRepayLoan] = useState({}); 
  const [showRepaymentSchedule, setShowRepaymentSchedule] = useState({}); 


  const fetchLoans = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/loans/my-loans", config);
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      alert("Failed to fetch loans");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);


  const fetchSchedule = async (loanId) => {
    setLoadingSchedule(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: No token found.");
      }

      const response = await axios.get(`/loans/${loanId}/repayment-schedule`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSchedule(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch repayment schedule.");
    } finally {
      setLoadingSchedule(false);
    }
  };

  // Handle repayment for a specific loan
  const handleRepayment = async (loanId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    const amount = repaymentAmounts[loanId];
    if (!amount) {
      alert("Please enter an amount to repay.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`/loans/${loanId}/repay`, { amount }, config);
      
      alert("Loan repayment successful!");

      // Reset repayment amount for this loan
      setRepaymentAmounts({ ...repaymentAmounts, [loanId]: "" });

      // Update the loan status locally
      const updatedLoans = loans.map((loan) =>
        loan._id === loanId ? { ...loan, status: "repaid" } : loan
      );
      setLoans(updatedLoans);

      // Refresh the list of loans from the server
      fetchLoans();
    } catch (error) {
      console.error("Repayment error:", error);
      alert(error.response?.data?.message || "Repayment failed");
    }
  };

  // Toggle visibility of repay loan section
  const toggleRepayLoan = (loanId) => {
    setShowRepayLoan((prev) => ({
      ...prev,
      [loanId]: !prev[loanId], // Toggle visibility for this loan
    }));
  };

  // Toggle visibility of repayment schedule section
  const toggleRepaymentSchedule = (loanId) => {
    setShowRepaymentSchedule((prev) => ({
      ...prev,
      [loanId]: !prev[loanId], // Toggle visibility for this loan
    }));

    // Fetch repayment schedule if it's being shown
    if (!showRepaymentSchedule[loanId]) {
      fetchSchedule(loanId);
    }
  };

  return (
    <div className="form-container">
      <h2>My Loans</h2>

      {loans.length > 0 ? (
        <ul>
          {loans.map((loan) => (
            <li key={loan._id} className="loan-card">
              <strong>Loan ID:</strong> {loan._id} <br />
              <strong>Amount:</strong> {loan.amount} <br />
              <strong>Status:</strong> {loan.status} <br />
              <strong>Duration:</strong> {loan.duration} months <br />

              {/* Button to toggle repayment schedule section */}
              <button onClick={() => toggleRepaymentSchedule(loan._id)}>
                {showRepaymentSchedule[loan._id] ? "Hide Repayment Schedule" : "View Repayment Schedule"}
              </button>

              {/* Show repayment schedule if this loan is selected */}
              {showRepaymentSchedule[loan._id] && (
                <div className="repayment-schedule">
                  <h3>Repayment Schedule</h3>
                  {loadingSchedule ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                  ) : schedule.length > 0 ? (
                    <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
                      <thead>
                        <tr>
                          <th>Due Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.map((item, index) => (
                          <tr key={index}>
                            <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                            <td>{item.amount.toFixed(2)}</td>
                            <td>{item.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No repayment schedule available.</p>
                  )}
                </div>
              )}

              {/* Show investor details if loan is accepted */}
              {loan.status === "accepted" && loan.investors.length > 0 && (
  <div className="investor-details">
    <h4>Investor Details</h4>
    {loan.investors.map((investor, index) => {
      // Debugging: Log each investor object
      console.log(investor);

      return (
        <div key={index}>
          <p><strong>Name:</strong> {investor.investor?.firstName || "N/A"} {investor.investor?.lastName || ""}</p>
          <p><strong>Email:</strong> {investor.investor?.email || "N/A"}</p>
          <p><strong>Investment:</strong> {investor.amount}</p>
        </div>
      );
    })}
  </div>
)}

              {/* Button to toggle repay loan section */}
              <button onClick={() => toggleRepayLoan(loan._id)}>
                {showRepayLoan[loan._id] ? "Hide Repay Loan" : "Show Repay Loan"}
              </button>

              {/* Repayment form for each loan (visible only if toggled) */}
              {showRepayLoan[loan._id] && (
                <div className="repayment-form">
                  <input
                    type="number"
                    placeholder="Amount to Repay"
                    value={repaymentAmounts[loan._id] || ""}
                    onChange={(e) =>
                      setRepaymentAmounts({ ...repaymentAmounts, [loan._id]: e.target.value })
                    }
                    required
                  />
                  <button onClick={() => handleRepayment(loan._id)}>Repay Loan</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No loans found</p>
      )}
    </div>
  );
};

export default MyLoans;