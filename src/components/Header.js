import React, { useContext, useState } from "react"; // Import React and hooks
import { useNavigate, Link } from "react-router-dom"; // Import hooks and Link for navigation
import "../assets/styles/Header.css"; // Import CSS for header styling
import cartIcon from "../assets/images/shopping-cart.png"; // Import cart icon
import userDefaultIcon from "../assets/images/user.png"; // Import default user icon
import headerLogo from "../assets/images/header_logo.svg"; // Import header logo
import { AuthContext } from "../services/AuthContext"; // Import authentication context
import AuthService from "../services/AuthService"; // Import authentication service
import { IMAGE_URL, getAllProducts } from "../services/ApiService"; // Import API service functions
import { toast } from "react-toastify";

const Header = () => {
	const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context
	const user = AuthService.getUser(); // Retrieve user details from AuthService
	const profilePic = user?.profile_pic
		? `${IMAGE_URL}${user?.profile_pic}`
		: userDefaultIcon; // Use user profile picture or default icon

	// State to manage search button text and disabled status
	const [buttonText, setButtonText] = useState("Search");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
	const navigate = useNavigate(); // Hook for navigation

	const handleSearch = async (e) => {
		e.preventDefault(); // Prevent default form submission
		setButtonText("Searching..."); // Update button text
		setIsButtonDisabled(true); // Disable button during search

		try {
			// Fetch search results from API
			const results = await getAllProducts(
				1,
				9,
				searchQuery,
				user?.user_id || ""
			);
			// Navigate to shop page with search results
			navigate("/shop", {
				state: {
					searchQuery,
					searchResults: results.data,
					total_count: results.total_count,
				},
			});
		} catch (error) {
			toast.error(error);
		} finally {
			// Reset button text and enable button
			setButtonText("Search");
			setIsButtonDisabled(false);
		}
	};

	return (
		<header className="header">
			<img
				src={headerLogo}
				alt="Modern Threads Logo" // Alt text for accessibility
				style={{ width: "270px", height: "auto" }} // Inline styling
			/>
			<nav className="header-nav">
				<Link to="/">Home</Link> {/* Navigation link to home */}
				<Link to="/shop">Shop</Link> {/* Navigation link to shop */}
				<Link to="/category">Category</Link> {/* Navigation link to category */}
			</nav>
			<div className="header-search">
				<input
					type="text"
					placeholder="Search for products..." // Placeholder text
					value={searchQuery} // Input value controlled by state
					disabled={isButtonDisabled} // Disable input if button is disabled
					onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
				/>
				<button onClick={handleSearch} disabled={isButtonDisabled}>
					{buttonText} {/* Button text */}
				</button>
			</div>
			<div className="header-icons">
				<Link to="/cart">
					<div className="icon-container">
						<img src={cartIcon} alt="Cart" /> {/* Cart icon */}
						<span>Cart</span> {/* Cart label */}
					</div>
				</Link>
				{isAuthenticated ? (
					<Link to="/profile">
						<div className="icon-container">
							<img
								src={`${profilePic}`} // User profile picture
								alt="Profile"
								className="profile-icon"
							/>
							<span>Profile</span> {/* Profile label */}
						</div>
					</Link>
				) : (
					<Link to="/login">
						<div className="icon-container">
							<img src={userDefaultIcon} alt="Login" /> {/* Login icon */}
							<span>Login</span> {/* Login label */}
						</div>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header; // Export the Header component
