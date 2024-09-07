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

export const getAllProducts = async (page, limit, search) => {
	try {
		const response = await axios.get(
			`${API_URL}/products/getAllProducts?page=${page}&limit=${limit}&search=${search}`
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getProductDetailsById = async (product_id) => {
	try {
		const response = await axios.get(
			`${API_URL}/products/getProductById?product_id=${product_id}`
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const addToCart = async (data) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.post(`${API_URL}/cart/addToCart`, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
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
