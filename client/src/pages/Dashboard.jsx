import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import FarmerDashboard from '../components/Farmer/FarmerDashboard';
import InvestorDashboard from '../components/Investor/InvestorDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  return (
    <div>
      {/* <h2>Welcome, {user.name}</h2> */}
      {user.role === 'farmer' && <FarmerDashboard />}
      {user.role === 'investor' && <InvestorDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
