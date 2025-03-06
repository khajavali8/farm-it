import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/AuthStyles.css";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        role: "" 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <input type="text" name="firstName" required placeholder=" " onChange={handleChange} />
                        <label>First Name</label>
                    </div>

                    <div className="input-group">
                        <input type="text" name="lastName" required placeholder=" " onChange={handleChange} />
                        <label>Last Name</label>
                    </div>

                    <div className="input-group">
                        <input type="email" name="email" required placeholder=" " onChange={handleChange} />
                        <label>Email Address</label>
                    </div>

                    <div className="input-group">
                        <input type="password" name="password" required placeholder=" " onChange={handleChange} />
                        <label>Password</label>
                    </div>

                    <div className="input-group">
                        <select name="role" required onChange={handleChange}>
                            <option value="">Select Role</option>
                            <option value="farmer">Farmer</option>
                            <option value="investor">Investor</option>
                        </select>
                    </div>

                    <button type="submit" className="auth-button">Register</button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
