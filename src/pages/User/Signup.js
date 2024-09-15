import React, { useContext, useState } from "react";
import "../../assets/styles/User/LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../services/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupUser } from "../../services/ApiService";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false); // State to manage loading indicator

	const { login } = useContext(AuthContext); // Auth context to handle login state
	const navigate = useNavigate(); // Hook to programmatically navigate

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Check if all required fields are filled
		if (firstName && lastName && email && password) {
			setLoading(true); // Show loading indicator
			try {
				const response = await signupUser({
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password,
				});

				// Login user and store data in AuthService
				login(response.data);
				AuthService.login(response.data);
				toast.success("Signup successful!"); // Notify user of success
				navigate("/"); // Redirect to home page
			} catch (error) {
				console.error("Signup error:", error); // Log error to console
				toast.error(error || "Signup failed!"); // Notify user of failure
			} finally {
				setLoading(false); // Hide loading indicator
			}
		} else {
			toast.error("Please provide all required fields."); // Notify user to fill all fields
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Signup</h2>
				<div className="form-group">
					<label htmlFor="firstName">First Name</label>
					<input
						id="firstName"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required // Ensure this field is filled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="lastName">Last Name</label>
					<input
						id="lastName"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required // Ensure this field is filled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required // Ensure this field is filled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required // Ensure this field is filled
					/>
				</div>
				<button type="submit" className="auth-button" disabled={loading}>
					{loading ? "Signing up..." : "Signup"}{" "}
					{/* Show loading indicator if processing */}
				</button>
				<div className="auth-switch">
					<span>Already have an account? </span>
					<Link to="/login">Login here</Link> {/* Link to login page */}
				</div>
			</form>
		</div>
	);
};

export default SignUp;
