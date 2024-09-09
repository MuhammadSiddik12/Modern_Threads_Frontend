const AuthService = {
	// Log in the user and store user data and auth token
	login: (userData, authToken) => {
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("authToken", authToken);
	},

	// Log out the user and clear user data and auth token
	logout: () => {
		localStorage.removeItem("user");
		localStorage.removeItem("authToken");
	},

	// Check if the user is authenticated
	isAuthenticated: () => {
		const token = localStorage.getItem("authToken");
		if (!token) return false;

		// Optional: Add logic here to check for token expiration if needed
		return !!localStorage.getItem("user");
	},

	// Retrieve the current user data
	getUser: () => {
		try {
			return JSON.parse(localStorage.getItem("user"));
		} catch (error) {
			console.error("Failed to parse user data:", error);
			return null;
		}
	},

	// Update the stored user data
	updateUser: (userData) => {
		localStorage.setItem("user", JSON.stringify(userData));
	},
};

export default AuthService;
