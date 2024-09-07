const AuthService = {
	login: (userData) => {
		// Example: store token after successful login
		localStorage.setItem("user", JSON.stringify(userData));
	},

	logout: () => {
		localStorage.removeItem("user");
		localStorage.removeItem("authToken");
	},

	isAuthenticated: () => {
		// Check if the user token is present in localStorage
		return !!localStorage.getItem("user");
	},

	getUser: () => {
		return JSON.parse(localStorage.getItem("user"));
	},

	updateUser: (userData) => {
		// Example: store token after successful login
		localStorage.removeItem("user");
		localStorage.setItem("user", JSON.stringify(userData));
	},
};

export default AuthService;
