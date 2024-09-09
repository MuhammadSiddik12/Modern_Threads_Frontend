import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/Header.css";
import cartIcon from "../assets/images/shopping-cart.png";
import userDefaultIcon from "../assets/images/user.png";
import headerLogo from "../assets/images/header_logo.svg";
import { AuthContext } from "../services/AuthContext";
import AuthService from "../services/AuthService";
import { IMAGE_URL, getAllProducts } from "../services/ApiService";

const Header = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const user = AuthService.getUser();
	const profilePic = user?.profile_pic || userDefaultIcon;

	const [buttonText, setButtonText] = useState("Search");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = async (e) => {
		e.preventDefault();
		setButtonText("Searching...");
		setIsButtonDisabled(true);

		try {
			const results = await getAllProducts(
				1,
				9,
				searchQuery,
				user?.user_id || ""
			);
			navigate("/shop", {
				state: {
					searchQuery,
					searchResults: results.data,
					total_count: results.total_count,
				},
			});
		} catch (error) {
			console.error("Search error:", error);
		} finally {
			setButtonText("Search");
			setIsButtonDisabled(false);
		}
	};

	return (
		<header className="header">
			<img
				src={headerLogo}
				alt="Modern Threads Logo"
				style={{ width: "270px", height: "auto" }}
			/>
			<nav className="header-nav">
				<Link to="/">Home</Link>
				<Link to="/shop">Shop</Link>
				<Link to="/category">Category</Link>
			</nav>
			<div className="header-search">
				<input
					type="text"
					placeholder="Search for products..."
					value={searchQuery}
					disabled={isButtonDisabled}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button onClick={handleSearch} disabled={isButtonDisabled}>
					{buttonText}
				</button>
			</div>
			<div className="header-icons">
				<Link to="/cart">
					<div className="icon-container">
						<img src={cartIcon} alt="Cart" />
						<span>Cart</span>
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
							<span>Profile</span>
						</div>
					</Link>
				) : (
					<Link to="/login">
						<div className="icon-container">
							<img src={userDefaultIcon} alt="Login" />
							<span>Login</span>
						</div>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
