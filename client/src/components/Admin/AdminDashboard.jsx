import React from "react";
import { Link } from "react-router-dom";
import "../../styles/FarmITStyles.css"; 
import Footer from "../Common/Footer";

const AdminDashboard = () => {
  const adminItems = [
    { path: "/admin/users", title: "Manage Users", icon: "👥", description: "View and manage all users" },
    // { path: "/admin/verify-users", title: "Verify Users", icon: "✅", description: "Verify new users" }, // if needed
    { path: "/admin/loans", title: "All Loans", icon: "💳", description: "Review all loan requests" },
    { path: "/admin/farms", title: "All Farms", icon: "🌾", description: "View all registered farms" },
    { path: "/admin/issues", title: "Reported Issues", icon: "⚠️", description: "See reported issues" },
  ];

  return (
    <div className="page-container" style={styles.pageContainer}>
      <div className="container" style={styles.container}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        <div style={styles.cardGrid}>
          {adminItems.map((item, index) => (
            <Link to={item.path} key={index} style={styles.card}>
              <div style={styles.cardContent}>
                <span style={styles.icon}>{item.icon}</span>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    paddingTop: "20px",
  },
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    display: "block",
    textDecoration: "none",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    width: "250px",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    color: "inherit",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "18px",
    margin: "10px 0",
    color: "#007bff",
  },
  cardDesc: {
    fontSize: "14px",
    color: "#555",
  },
};

export default AdminDashboard;
