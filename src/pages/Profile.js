import React, { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import "../assets/styles/ProfilePage.css";
import userDefault from "../assets/images/user.png";

const ProfilePage = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const user = AuthService.getUser();

	const [profilePic] = useState(user?.profilePic || userDefault);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const profileOptions = [
		{ name: "My Orders", link: "/orders", icon: "🛒" },
		{ name: "Edit Profile", link: "/editProfile", icon: "✏️" },
	];

	return (
		<div className="profile-container">
			<div className="profile-header">
				<img src={profilePic} alt="User Avatar" className="profile-avatar" />
				<h2>{user?.name || "John Doe"}</h2>

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

export default ProfilePage;
