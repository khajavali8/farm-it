import React from "react";
import { Link } from "react-router-dom";
import "../../styles/FarmITStyles.css";
import Footer from "../Common/Footer";

const FarmerDashboard = () => {
  const dashboardItems = [
    { path: "/farmer/farm-form", icon: "🚜", title: "Register a Farm", description: "Add and manage your farm details." },
    { path: "/farmer/my-farms", icon: "🌾", title: "My Farms", description: "View and manage your registered farms." },
    { path: "/farmer/upload-document", icon: "📄", title: "Upload Document", description: "Submit necessary farm-related documents." },
    { path: "/farmer/my-documents", icon: "📂", title: "My Documents", description: "View and download uploaded documents." },
    { path: "/farmer/request-loan", icon: "💰", title: "Request a Loan", description: "Apply for farm-related financial support." },
    { path: "/farmer/my-loans", icon: "💳", title: "My Loans", description: "Track your loan requests and approvals." },
    { path: "/farmer/transactions", icon: "💸", title: "My Transactions", description: "Monitor all your financial transactions." },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="dashboard-title">Welcome, Farmer!</h1>
        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <Link to={item.path} key={index} className="dashboard-card">
              <div className="card-content">
                <span className="icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
