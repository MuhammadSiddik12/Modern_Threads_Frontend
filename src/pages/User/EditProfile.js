import React, { useState, useEffect } from "react";
import {
	getUserDetails,
	updateUserDetails,
	uploadImage,
} from "../../services/ApiService";
import "../../assets/styles/User/EditProfile.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/AuthService";

const EditProfile = () => {
	const [uploadPic, setUploadPic] = useState(""); // State for storing uploaded profile picture
	const [userInfo, setUserInfo] = useState({}); // State for storing user details
	const navigate = useNavigate(); // Hook for programmatic navigation
	const [buttonText, setButtonText] = useState("Save Changes"); // State for button text
	const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for button disabled state
	const [loading, setLoading] = useState(true); // State for loading indicator

	useEffect(() => {
		// Fetch user details when component mounts
		const fetchUser = async () => {
			try {
				const user = await getUserDetails(); // Call API to get user details
				setUserInfo(user.data); // Set user details in state
				setLoading(false); // Set loading to false after data is fetched
			} catch (error) {
				navigate("/login"); // Redirect to login if there's an error
			}
		};

		fetchUser(); // Call fetchUser function
	}, [navigate]);

	const handleChange = (e) => {
		// Update userInfo state when input fields change
		const { name, value } = e.target;
		setUserInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		// Update uploadPic state when a new file is selected
		const file = e.target.files[0];
		if (file) {
			setUploadPic(file);
		}
	};

	const handleSave = async () => {
		try {
			setButtonText("Saving Changes..."); // Update button text during save
			setIsButtonDisabled(true); // Disable button to prevent multiple submissions

			const formDataUser = {
				...userInfo,
			};

			let imageUrl = null;
			if (uploadPic) {
				// If there's a new profile picture, upload it
				const formDataImage = new FormData();
				formDataImage.append("image", uploadPic);

				const imageResponse = await uploadImage(formDataImage);
				imageUrl = imageResponse.filePath;
				formDataUser.profile_pic = imageUrl; // Add image URL to user info
			}

			// Update user details via API
			const user = await updateUserDetails({ ...formDataUser });
			AuthService.updateUser(user.data); // Update user data in AuthService
			toast.success("Profile updated successfully!"); // Show success toast
			navigate("/profile"); // Redirect to profile page after successful update
		} catch (error) {
			setButtonText("Save Changes"); // Reset button text on error
			setIsButtonDisabled(false); // Re-enable button
			toast.error(error);
		}
	};

	// Show a loading message while fetching user details
	if (loading)
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);

	return (
		<div className="edit-profile-page">
			<h2>Edit Profile</h2>
			<form className="profile-form">
				{/* Profile Picture Input */}
				<label>
					<span>Profile Picture:</span>
					<input
						type="file"
						name="profilePic"
						accept="image/*"
						onChange={handleFileChange} // Handle file change
					/>
				</label>
				{/* Full Name Input */}
				<label>
					<span>Full Name:</span>
					<input
						type="text"
						name="first_name"
						value={userInfo.first_name || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>
				{/* Last Name Input */}
				<label>
					<span>Last Name:</span>
					<input
						type="text"
						name="last_name"
						value={userInfo.last_name || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>
				{/* Email Input */}
				<label>
					<span>Email:</span>
					<input
						type="email"
						name="email"
						value={userInfo.email || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>
				{/* Phone Number Input */}
				<label>
					<span>Phone:</span>
					<input
						type="text"
						name="phone_number"
						value={userInfo.phone_number || ""} // Set value from state
						onChange={handleChange} // Handle input change
						maxLength="10" // Limit to 10 characters
					/>
				</label>
				{/* Street Address Input */}
				<label>
					<span>Street Address:</span>
					<input
						type="text"
						name="street"
						value={userInfo.street || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>
				{/* City Input */}
				<label>
					<span>City:</span>
					<input
						type="text"
						name="city"
						value={userInfo.city || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>
				{/* State Input */}
				<label>
					<span>State:</span>
					<input
						type="text"
						name="state"
						value={userInfo.state || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>
				{/* Country Input */}
				<label>
					<span>Country:</span>
					<input
						type="text"
						name="country"
						value={userInfo.country || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>
				{/* ZIP Code Input */}
				<label>
					<span>ZIP Code:</span>
					<input
						type="text"
						name="zip_code"
						value={userInfo.zip_code || ""} // Set value from state
						onChange={handleChange} // Handle input change
					/>
				</label>

				{/* Save Button */}
				<button
					className="save-button"
					type="button"
					disabled={isButtonDisabled} // Disable button while saving
					onClick={handleSave} // Handle save button click
				>
					{buttonText} {/* Show appropriate button text */}
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
