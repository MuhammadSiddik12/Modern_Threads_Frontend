import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import "../assets/styles/LoginSignup.css";
import { AuthContext } from "../services/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../services/ApiService";

const LoginPage = () => {
	const [email, setEmail] = useState(""); // State for storing email input
	const [password, setPassword] = useState(""); // State for storing password input
	const [loading, setLoading] = useState(false); // State for loading indicator
	const navigate = useNavigate(); // Hook for programmatic navigation
	const { login } = useContext(AuthContext); // Get login function from AuthContext

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		if (email && password) {
			setLoading(true); // Set loading to true when starting the login process
			try {
				const response = await loginUser({ email, password });
				login(response.data); // Set user data in context
				AuthService.login(response.data); // Save user data in localStorage
				localStorage.setItem("authToken", response.token);
				toast.success("Login successful!");
				navigate("/"); // Redirect to home page after successful login
			} catch (error) {
				console.log("🚀 ~ handleSubmit ~ error:", error);
				toast.error(error.response?.data?.message || "Login failed!"); // Improved error handling
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
					{loading ? "Logging in..." : "Login"}
				</button>

				<div className="auth-switch">
					<span>Don't have an account? </span>
					<Link to="/signup">Sign up here</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
