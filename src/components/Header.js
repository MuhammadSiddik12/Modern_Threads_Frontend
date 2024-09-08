import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import cart from "../assets/images/shopping-cart.png";
import userDefault from "../assets/images/user.png";
import header_logo from "../assets/images/header_logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import AuthService from "../services/authService";
import { IMAGE_URL, getAllProducts } from "../services/ApiService"; // Import your API service

const Header = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const user = AuthService.getUser();
	const profilePic = user?.profile_pic || userDefault;

	const [buttonText, setButtonText] = useState("Search");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = async (e) => {
		try {
			setButtonText("Searching...");
			setIsButtonDisabled(true);
			e.preventDefault();

			// Fetch search results
			const results = await getAllProducts(
				1,
				9,
				searchQuery,
				user.user_id || ""
			);

			// Navigate to the Shop page with the search results
			setButtonText("Search");
			setIsButtonDisabled(false);
			navigate("/shop", {
				state: {
					searchQuery: searchQuery,
					searchResults: results.data,
					total_count: results.total_count,
				},
			});
		} catch (error) {
			console.log("🚀 ~ handleSearch ~ error:", error);
			setButtonText("Search");
			setIsButtonDisabled(false);
		}
	};

	return (
		<header className="header">
			<img
				src={header_logo}
				alt="logo"
				style={{ width: "270px", height: "auto" }}
			/>
			<nav className="header-nav">
				<a href="/">Home</a>
				<a href="/shop">Shop</a>
				<a href="/category">Category</a>
			</nav>
			<div className="header-search">
				<input
					type="text"
					placeholder="Search for products..."
					value={searchQuery}
					disabled={isButtonDisabled}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button onClick={handleSearch}>{buttonText}</button>
			</div>
			<div className="header-icons">
				<Link to="/cart">
					<div className="icon-container">
						<img src={cart} alt="Cart" />
						<a className="icon" href="" title="Cart">
							Cart
						</a>
					</div>
				</Link>
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
