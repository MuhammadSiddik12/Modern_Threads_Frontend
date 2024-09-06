import axios from "axios";

const API_URL = "http://localhost:3001/users";
export const IMAGE_URL = "http://localhost:3001";

export const signupUser = async (data) => {
	try {
		const response = await axios.post(`${API_URL}/userRegister`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const loginUser = async (data) => {
	try {
		const response = await axios.post(`${API_URL}/userLogin`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getAllCategories = async () => {
	try {
		const response = await axios.get(`${API_URL}/category/getAllCategories`);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

const handleError = (error) => {
	console.error("API error:", error);
	throw error.response?.data?.message || error.message;
};

export const logout = async () => {
	try {
		localStorage.removeItem("authToken");
	} catch (error) {
		throw error.message ? error.message : "Logout failed";
	}
};
