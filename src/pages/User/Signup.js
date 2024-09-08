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
	const [loading, setLoading] = useState(false); // Added loading state

	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (firstName && lastName && email && password) {
			setLoading(true); // Set loading to true when starting the signup process
			try {
				const response = await signupUser({
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password,
				});

				login(response.data);
				AuthService.login(response.data);
				toast.success("Signup successful!");
				navigate("/");
			} catch (error) {
				console.log("🚀 ~ handleSubmit ~ error:", error);
				toast.error(error.response?.data?.message || "Signup failed!"); // Improved error handling
			} finally {
				setLoading(false); // Reset loading state
			}
		} else {
			toast.error("Please provide valid input");
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Signup</h2>
				<div className="form-group">
					<label>First Name</label>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Last Name</label>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="auth-button" disabled={loading}>
					{loading ? "Signing up..." : "Signup"}
				</button>
				<div className="auth-switch">
					<span>Already have an account? </span>
					<Link to="/login">Login here</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
