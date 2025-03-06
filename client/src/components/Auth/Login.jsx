import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import api from "../../services/api";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", formData);
            const { token, user } = response.data; // Ensure backend returns { token, user }

            // Call login function from AuthContext
            login(user, token);

            alert("Login successful!");
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
            </div>
        </div>
    );
};

export default Login;
