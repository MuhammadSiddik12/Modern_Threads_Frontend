import React, { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import "../assets/styles/ProfilePage.css";
import userDefault from "../assets/images/user.png";

const ProfilePage = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const user = AuthService.getUser(); // Example user data

	const [userInfo, setUserInfo] = useState(user);
	const [isEditing, setIsEditing] = useState(false);
	const [profilePic, setProfilePic] = useState(user.profilePic || userDefault); // Add profilePic state

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePic(reader.result); // Update profilePic with the file URL
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		// Save user data logic including profile picture
		AuthService.updateUser({ ...userInfo, profilePic });
		setIsEditing(false); // Disable editing mode after saving
	};

	const handleEdit = () => {
		setIsEditing(true); // Enable editing mode
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="profile-container">
			<div className="profile-header">
				<img
					src={profilePic} // Display the selected profile picture or a default one
					alt="User Avatar"
					className="profile-avatar"
				/>
				<h2>{userInfo.name || "John Doe"}</h2>
			</div>
			<form className="profile-form">
				<label>
					<span>Profile Picture:</span>
					<input
						type="file"
						name="profilePic"
						accept="image/*"
						onChange={handleFileChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					<span>Full Name:</span>
					<input
						type="text"
						name="name"
						value={userInfo.name || ""}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					<span>Email:</span>
					<input
						type="email"
						name="email"
						value={userInfo.email || ""}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					<span>Phone:</span>
					<input
						type="tel"
						name="phone"
						value={userInfo.phone || ""}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					<span>Address:</span>
					<input
						type="text"
						name="address"
						value={userInfo.address || ""}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				{isEditing ? (
					<button className="save-button" type="button" onClick={handleSave}>
						Save Changes
					</button>
				) : (
					<button className="edit-button" type="button" onClick={handleEdit}>
						Edit Profile
					</button>
				)}
				<button className="logout-button" type="button" onClick={handleLogout}>
					Logout
				</button>
			</form>
		</div>
	);
};

export default ProfilePage;
