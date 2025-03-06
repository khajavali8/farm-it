import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/AuthStyles.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", formData);
            alert("Login successful!");
            console.log("Response:", response.data);
            navigate("/dashboard");  
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">Login</div>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input type="email" name="email" required placeholder=" " onChange={handleChange} />
                        <label>Email Address</label>
                    </div>

                    <div className="input-group">
                        <input type="password" name="password" required placeholder=" " onChange={handleChange} />
                        <label>Password</label>
                    </div>

                    <button type="submit" className="auth-button">Login</button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
