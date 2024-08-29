import React, { useContext, useState } from "react";
import "../assets/styles/LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import { AuthContext } from "../services/AuthContext";

const SignupForm = () => {
	const [name, setName] = useState(""); // State for storing name input
	const [email, setEmail] = useState(""); // State for storing email input
	const [password, setPassword] = useState(""); // State for storing password input

	const { login } = useContext(AuthContext); // Get login function from AuthContext
	const navigate = useNavigate(); // Hook for programmatic navigation

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Basic validation logic
		if (name && email && password) {
			// Simulate user data and login process
			const userData = { name, email, password, token: "sample-token" };
			login(userData); // Set user data in context
			AuthService.login(userData); // Save user data in localStorage
			navigate("/"); // Redirect to home page after successful login
		} else {
			alert("Please provide valid input"); // Alert if validation fails
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Signup</h2>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)} // Update name state on change
						required // Ensure field is filled before submission
					/>
				</div>
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
				<button type="submit" className="auth-button">
					Signup
				</button>
				{/* Link to login page for users who already have an account */}
				<div className="auth-switch">
					<span>Already have an account? </span>
					<Link to="/login">Login here</Link>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;
