import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/User/Profile.css";
import userDefault from "../../assets/images/user.png";
import { getUserDetails, IMAGE_URL } from "../../services/ApiService";

const Profile = () => {
	const { logout } = useContext(AuthContext); // Get logout function from AuthContext
	const navigate = useNavigate(); // Hook to programmatically navigate
	const [userInfo, setUserInfo] = useState({}); // State to hold user details
	const [profilePic, setProfilePic] = useState(""); // State to hold profile picture URL
	const [loading, setLoading] = useState(true); // State to manage loading indicator

	useEffect(() => {
		// Fetch user details when the component mounts
		const fetchUser = async () => {
			try {
				const user = await getUserDetails(); // Fetch user details from API
				setUserInfo(user.data); // Set user details in state
				setProfilePic(user.data.profile_pic || userDefault); // Set profile picture or default image
				setLoading(false); // Hide loading indicator
			} catch (error) {
				navigate("/login"); // Redirect to login page if there's an error
			}
		};

		fetchUser(); // Call fetchUser function
	}, [navigate]); // Dependency array includes navigate to avoid warnings

	// Handle user logout
	const handleLogout = () => {
		logout(); // Call logout function from AuthContext
		navigate("/login"); // Redirect to login page
	};

	// Profile options for navigation
	const profileOptions = [
		{ name: "My Orders", link: "/orders", icon: "🛒" },
		{ name: "My Transactions", link: "/payments", icon: "💲" },
		{ name: "Edit Profile", link: "/editProfile", icon: "✏️" },
	];

	if (loading)
		return (
			<div>
				<h2>Loading...</h2>{" "}
				{/* Show loading message while data is being fetched */}
			</div>
		);

	return (
		<div className="profile-container">
			<div className="profile-header">
				<img
					src={`${IMAGE_URL}${profilePic}`}
					alt="User Avatar"
					className="profile-avatar" // Profile picture styling
				/>
				<h2>
					{userInfo?.first_name + " " + userInfo?.last_name || "User Name"}
					{/* Display user name or default text */}
				</h2>

				<div className="profile-page">
					{profileOptions.map((option, index) => (
						<Link to={option.link} key={index} className="profile-option">
							<span className="option-icon">{option.icon}</span>
							<span className="option-name">{option.name}</span>
						</Link>
					))}

					<button onClick={handleLogout} className="profile-option">
						<span className="option-icon">🚪</span>
						<span className="option-name">Logout</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
