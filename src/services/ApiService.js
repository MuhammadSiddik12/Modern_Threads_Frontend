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

export const getAllProducts = async (page, limit, search, user_id) => {
	try {
		const response = await axios.get(
			`${API_URL}/products/getAllProducts?page=${page}&limit=${limit}&search=${search}&user_id=${user_id}`
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getAllProductsByCategory = async (id, page, limit, search) => {
	try {
		const response = await axios.get(
			`${API_URL}/products/getAllProductsByCategory?category_id=${id}&page=${page}&limit=${limit}&search=${search}`
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
		if (error.status == 401) {
			handleError({ message: "Please log in to add product to your cart." });
		}

		handleError(error);
	}
};

export const getCartItems = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(`${API_URL}/cart/getAllCartItems`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const removeCartItem = (id) => {
	const token = localStorage.getItem("authToken");

	return axios.delete(`${API_URL}/cart/removeItem?cart_id=${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getUserDetails = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(`${API_URL}/getUserDetails`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const updateUserDetails = async (data) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.put(`${API_URL}/editUserProfile`, data, {
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

export const uploadImage = async (formData) => {
	try {
		const response = await axios.post(`${IMAGE_URL}/uploadImage`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const checkoutCart = async (
	orderItems,
	shippingAddress,
	billingAddress
) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.post(
			`${API_URL}/cart/order/createOrder`,
			{
				order_items: orderItems,
				shipping_address: shippingAddress,
				billing_address: billingAddress,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`, // Ensure token is stored in localStorage
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ error:", error);
		throw error.response.data.message || "Checkout failed.";
	}
};

export const createPaymentCheckout = async (order_id) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.post(
			`${API_URL}/payments/createPaymentCheckout`,
			{
				order_id: order_id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`, // Ensure token is stored in localStorage
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ error:", error);
		throw error.response.data.message || "Checkout failed.";
	}
};

export const getAllMyOrders = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(`${API_URL}/cart/order/getAllMyOrders`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getOrderDetailsById = async (order_id) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(
			`${API_URL}/cart/order/getOrderDetailsById?order_id=${order_id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const cancelOrder = (id) => {
	const token = localStorage.getItem("authToken");

	return axios.delete(`${API_URL}/cart/order/cancelOrderById?order_id=${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// Payments
export const getAllPayments = async (page, limit) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(`${API_URL}/payments/getAllPayments`, {
			params: { page, limit },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getPaymentById = async (paymentId) => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await axios.get(`${API_URL}/payments/getPaymentDetails`, {
			params: { payment_id: paymentId },
			headers: {
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
