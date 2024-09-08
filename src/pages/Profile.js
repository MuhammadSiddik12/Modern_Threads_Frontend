import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/ProfilePage.css";
import userDefault from "../assets/images/user.png";
import { getUserDetails, IMAGE_URL } from "../services/ApiService";

const ProfilePage = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({});
	const [profilePic, setProfilePic] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await getUserDetails();
				console.log("🚀 ~ fetchUser ~ user:", user);
				setUserInfo(user.data);
				setProfilePic(user.data.profile_pic || userDefault);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user details:", error);
				navigate("/login");
			}
		};

		fetchUser();
	}, [navigate]);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const profileOptions = [
		{ name: "My Orders", link: "/orders", icon: "🛒" },
		{ name: "My Transactions", link: "/payments", icon: "💲" },
		{ name: "Edit Profile", link: "/editProfile", icon: "✏️" },
	];

	if (loading)
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);

	return (
		<div className="profile-container">
			<div className="profile-header">
				<img
					src={`${IMAGE_URL}${profilePic}`}
					alt="User Avatar"
					className="profile-avatar"
				/>
				<h2>
					{userInfo?.first_name + " " + userInfo?.last_name || "John Doe"}
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

export default ProfilePage;
