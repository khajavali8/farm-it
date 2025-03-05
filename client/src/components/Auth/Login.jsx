import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { loginUser } from "../../services/auth";
import "../../styles/AuthStyles.css"; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginUser(credentials);
        
        if (data) {
            login(data.user, data.token); 
            navigate("/dashboard");
        } else {
            setError(true);
            setTimeout(() => setError(false), 500); 
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className={`auth-card ${error ? "shake" : ""}`}>
                <div className="auth-header">Login Form</div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input name="email" type="email" required onChange={handleChange} />
                        <label>Email Address</label>
                    </div>
                    <div className="input-group">
                        <input name="password" type="password" required onChange={handleChange} />
                        <label>Password</label>
                    </div>
                    <div className="auth-options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                    <p className="auth-footer">
                        Not a member? <Link to="/register">Signup now</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;