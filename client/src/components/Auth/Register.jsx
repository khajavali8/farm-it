import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/AuthStyles.css"; 
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        role: "" 
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", formData);
            alert("Registration successful! Please login.");
            console.log("Response:", response.data);
            navigate("/login");  
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">Register</div>
                {/* <DotLottieReact
      src="https://lottie.host/2da4e0b0-1930-4191-9106-18c9bbc5f2cc/CP8ynzgWGR.lottie"
      loop
      autoplay
    /> */}
                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="input-group">
                        <input type="text" required onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                        <label>First Name</label>
                    </div>
                    <div className="input-group">
                        <input type="text" required onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                        <label>Last Name</label>
                    </div>
                    <div className="input-group">
                        <input type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <label>Email Address</label>
                    </div>
                    <div className="input-group">
                        <input type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <label>Password</label>
                    </div>
                    <div className="auth-options">
                        <select onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="role-dropdown">
                        <option value="" disabled selected>Select Role</option> 
                            <option value="farmer">Farmer</option>
                            <option value="investor">Investor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="auth-button">Register</button>
                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
