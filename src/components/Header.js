import React, { useContext } from "react";
import "../assets/styles/Header.css";
import cart from "../assets/images/shopping-cart.png";
import userDefault from "../assets/images/user.png";
import header_logo from "../assets/images/header_logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import AuthService from "../services/authService";
import { IMAGE_URL } from "../services/ApiService"; // Import your API service
const Header = () => {
	const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context
	const user = AuthService.getUser(); // Retrieve current user information
	const profilePic = user?.profile_pic || userDefault; // Fallback to default profile picture if none is available

	return (
		<header className="header">
			{/* Logo */}
			<img
				src={header_logo}
				alt="logo"
				style={{ width: "270px", height: "auto" }} // Inline styling for logo size
			/>
			{/* Navigation links */}
			<nav className="header-nav">
				<a href="/">Home</a>
				<a href="/shop">Shop</a>
				<a href="/category">Category</a>
			</nav>
			{/* Search bar */}
			<div className="header-search">
				<input type="text" placeholder="Search for products, brands and more" />
				<button>Search</button>
			</div>
			{/* Header icons (cart, profile/login) */}
			<div className="header-icons">
				<Link to="/cart">
					<div className="icon-container">
						<img src={cart} alt="Cart" />
						<a className="icon" href="" title="Cart">
							Cart
						</a>
					</div>
				</Link>
				{/* Conditional rendering based on authentication status */}
				{isAuthenticated ? (
					<Link to="/profile">
						<div className="icon-container">
							<img
								src={`${IMAGE_URL}${profilePic}`}
								alt="Profile"
								className="profile-icon"
							/>
							<a className="icon" href="" title="Profile">
								Profile
							</a>
						</div>
					</Link>
				) : (
					<Link to="/login">
						<div className="icon-container">
							<img src={userDefault} alt="User Profile" />
							<a className="icon" href="" title="Login">
								Login
							</a>
						</div>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
