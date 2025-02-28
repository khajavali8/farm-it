import React from "react";
import { Link } from "react-router-dom";
import "../../styles/FarmITStyles.css";
import Footer from "../Common/Footer";

const InvestorDashboard = () => {
  return (
    <div className="investor-dashboard">
      <h1 className="dashboard-title">Welcome, Investor!</h1>
      <div className="dashboard-grid">
        <Link to="/investor/view-farms" className="dashboard-card">
          <div className="card-content">
            <span className="icon">🌿</span>
            <h3>View Farms</h3>
            <p>Explore available farms for investment</p>
          </div>
        </Link>

        <Link to="/investor/invest-farm" className="dashboard-card">
          <div className="card-content">
            <span className="icon">💰</span>
            <h3>Invest in a Farm</h3>
            <p>Make an investment in a promising farm</p>
          </div>
        </Link>

        <Link to="/investor/my-investments" className="dashboard-card">
          <div className="card-content">
            <span className="icon">📊</span>
            <h3>My Investments</h3>
            <p>Track and manage your investments</p>
          </div>
        </Link>

        <Link to="/investor/available-loans" className="dashboard-card">
          <div className="card-content">
            <span className="icon">🏦</span>
            <h3>Available Loans</h3>
            <p>Check available loan opportunities</p>
          </div>
        </Link>

        <Link to="/investor/transactions" className="dashboard-card">
          <div className="card-content">
            <span className="icon">💸</span>
            <h3>My Transactions</h3>
            <p>View your financial transactions</p>
          </div>
        </Link>

        <Link to="/investor/transactions/analytics" className="dashboard-card">
          <div className="card-content">
            <span className="icon">📈</span>
            <h3>Transaction Analytics</h3>
            <p>Analyze your transaction trends</p>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default InvestorDashboard;
