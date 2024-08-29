import React, { useContext } from "react";
import "../assets/styles/Header.css";
import cart from "../assets/images/shopping-cart.png";
import userDefault from "../assets/images/user.png";
import header_logo from "../assets/images/header_logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import AuthService from "../services/authService";

const Header = () => {
	const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context
	const user = AuthService.getUser(); // Retrieve current user information
	const profilePic = user?.profilePic || userDefault; // Fallback to default profile picture if none is available

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
				<a href="/deals">Deals</a>
				<a href="/contact">Contact Us</a>
			</nav>
			{/* Search bar */}
			<div className="header-search">
				<input type="text" placeholder="Search for products, brands and more" />
				<button>Search</button>
			</div>
			{/* Header icons (cart, profile/login) */}
			<div className="header-icons">
				<div className="icon-container">
					<img src={cart} alt="Cart" />
					<a className="icon" href="" title="Cart">
						Cart
					</a>
				</div>
				{/* Conditional rendering based on authentication status */}
				{isAuthenticated ? (
					<div className="icon-container">
						<img src={profilePic} alt="Profile" className="profile-icon" />
						<Link to="/profile">Profile</Link>
					</div>
				) : (
					<div className="icon-container">
						<img src={userDefault} alt="User Profile" />
						<Link to="/login">Login</Link>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
