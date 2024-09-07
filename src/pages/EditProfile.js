import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails } from "../services/ApiService";
import "../assets/styles/EditProfile.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
	const [profilePic, setProfilePic] = useState("");
	const [userInfo, setUserInfo] = useState({});
	const navigate = useNavigate();
	const [buttonText, setButtonText] = useState("Save Changes");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await getUserDetails();
				setUserInfo(user.data);
				setProfilePic(user.data.profile_pic || "");
			} catch (error) {
				console.error("Error fetching user details:", error);
				navigate("/login");
			}
		};

		fetchUser();
	}, [navigate]);

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
			setButtonText("Saving Changes...");
			setIsButtonDisabled(true);
			await updateUserDetails({ ...userInfo, profile_pic: profilePic });
			toast.success("Profile updated successfully!");
			navigate("/profile");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error(error);
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
						name="first_name"
						value={userInfo.first_name || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					<span>Last Name:</span>
					<input
						type="text"
						name="last_name"
						value={userInfo.last_name || ""}
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
						type="text"
						name="phone_number"
						value={userInfo.phone_number || ""}
						onChange={handleChange}
						maxLength="10"
					/>
				</label>
				<label>
					<span>Street Address:</span>
					<input
						type="text"
						name="street"
						value={userInfo.street || ""}
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
						name="zip_code"
						value={userInfo.zip_code || ""}
						onChange={handleChange}
					/>
				</label>

				<button
					className="save-button"
					type="button"
					disabled={isButtonDisabled}
					onClick={handleSave}
				>
					{buttonText}
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
