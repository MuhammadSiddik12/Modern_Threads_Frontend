import React, { useState } from "react";
import AuthService from "../services/authService";
import "../assets/styles/EditProfile.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const user = AuthService.getUser(); // Example user data

	const [profilePic, setProfilePic] = useState(user?.profilePic || "");
	const [userInfo, setUserInfo] = useState(user);

	const navigate = useNavigate();

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
			setProfilePic(file);
		}
	};

	const handleSave = async () => {
		try {
			AuthService.updateUser({ ...userInfo, profilePic });
			navigate("/profile");
		} catch (error) {
			console.error("Error sdfsdfsds profile:", error);
			navigate("/login");
		}
	};

	return (
		<div className="edit-profile-page">
			<h2>Edit Profile</h2>
			<form className="profile-form">
				<label>
					<span>Profile Picture:</span>
					<input
						type="file"
						name="profilePic"
						accept="image/*"
						onChange={handleFileChange}
					/>
				</label>
				<label>
					<span>Full Name:</span>
					<input
						type="text"
						name="name"
						value={userInfo.name || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>Email:</span>
					<input
						type="email"
						name="email"
						value={userInfo.email || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>Phone:</span>
					<input
						type="tel"
						name="phone"
						value={userInfo.phone || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>Address Line 1:</span>
					<input
						type="text"
						name="addressLine1"
						value={userInfo.addressLine1 || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>Address Line 2:</span>
					<input
						type="text"
						name="addressLine2"
						value={userInfo.addressLine2 || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>City:</span>
					<input
						type="text"
						name="city"
						value={userInfo.city || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>State:</span>
					<input
						type="text"
						name="state"
						value={userInfo.state || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>Country:</span>
					<input
						type="text"
						name="country"
						value={userInfo.country || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>ZIP Code:</span>
					<input
						type="text"
						name="zipCode"
						value={userInfo.zipCode || ""}
						onChange={handleChange}
					/>
				</label>

				<button className="save-button" type="button" onClick={handleSave}>
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
