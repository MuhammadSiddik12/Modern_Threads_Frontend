import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "../../assets/styles/User/LoginSignup.css";
import { AuthContext } from "../../services/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../services/ApiService";

const Login = () => {
	const [email, setEmail] = useState(""); // State for storing email input
	const [password, setPassword] = useState(""); // State for storing password input
	const [loading, setLoading] = useState(false); // State for loading indicator
	const navigate = useNavigate(); // Hook for programmatic navigation
	const { login } = useContext(AuthContext); // Get login function from AuthContext

	const handleSubmit = async (e) => {
		if (email && password) {
			// Check if email and password are provided
			setLoading(true); // Set loading to true when starting the login process
			try {
				const response = await loginUser({ email, password }); // Call login API
				login(response.data); // Set user data in context
				AuthService.login(response.data); // Save user data in localStorage
				localStorage.setItem("authToken", response.token); // Store auth token
				toast.success("Login successful!"); // Show success toast
				navigate("/"); // Redirect to home page after successful login
			} catch (error) {
				toast.error(error || "Login failed!"); // Show error toast
			} finally {
				setLoading(false); // Reset loading state
			}
		} else {
			toast.error("Please provide valid input"); // Show error toast if validation fails
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Login</h2>
				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)} // Update email state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} // Update password state on change
						required // Ensure field is filled before submission
					/>
				</div>
				<button type="submit" className="auth-button" disabled={loading}>
					{loading ? "Logging in..." : "Login"}{" "}
					{/* Show appropriate button text based on loading state */}
				</button>

				<div className="auth-switch">
					<span>Don't have an account? </span>
					<Link to="/signup">Sign up here</Link> {/* Link to signup page */}
				</div>
			</form>
		</div>
	);
};

export default Login;
