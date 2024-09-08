import React, { useState, useEffect } from "react";
import "../assets/styles/Cart.css";
import { Link } from "react-router-dom";
import {
	getCartItems,
	removeCartItem,
	checkoutCart,
	IMAGE_URL,
	getUserDetails,
} from "../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch cart items from API on component mount
	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCartItems(); // Fetch cart items from the API
				setCartItems(response.data);
			} catch (err) {
				toast.error(err.message || "Failed to fetch cart items.");
				setError("Failed to fetch cart items.");
			} finally {
				setLoading(false);
			}
		};

		fetchCartItems();
	}, []);

	const getTotalPrice = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	// Handle removing an item from the cart
	const handleRemoveItem = async (id) => {
		try {
			await removeCartItem(id); // API call to remove item
			setCartItems((prevItems) =>
				prevItems.filter((item) => item.cart_id !== id)
			);
			toast.success("Item removed successfully!");
		} catch (err) {
			toast.error(err.message || "Failed to remove item.");
			setError("Failed to remove item.");
		}
	};

	// Handle checkout process
	const handleCheckout = async () => {
		const orderItems = cartItems.map((item) => item.cart_id);
		const user = await getUserDetails();
		const data = user.data;
		const shippingAddress = {
			street: data.street,
			city: data.city,
			state: data.state,
			postal_code: data.zip_code,
			country: data.country,
		};
		const billingAddress = {
			street: data.street,
			city: data.city,
			state: data.state,
			postal_code: data.zip_code,
			country: data.country,
		};

		try {
			await checkoutCart(orderItems, shippingAddress, billingAddress);
			toast.success("Checkout successful!");
		} catch (err) {
			toast.error(err || "Checkout failed.");
		}
	};

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="cart-page">
			<h2>Your Cart</h2>
			{cartItems.length === 0 ? (
				<div className="empty-cart">
					<p>Your cart is empty</p>
					<Link to="/shop" className="continue-shopping-button">
						Continue Shopping
					</Link>
				</div>
			) : (
				<div className="cart-content">
					<div className="cart-items">
						{cartItems.map((item) => (
							<div key={item.cart_id} className="cart-item">
								<Link
									to={`/product/productDetails/${item.product_id}`}
									className="cart-item-link"
								>
									<img
										src={`${IMAGE_URL}${item.product_details.product_images[0]}`}
										alt={item.name}
										className="cart-item-image"
									/>
								</Link>
								<div className="cart-item-details">
									<Link
										to={`/product/productDetails/${item.product_id}`}
										className="cart-item-link"
									>
										<h3>{item.product_details.product_name}</h3>
										<p>Price: ₹{item.price}</p>
										<p>Quantity: {item.quantity}</p>
									</Link>
									<button
										className="remove-button"
										onClick={() => handleRemoveItem(item.cart_id)}
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="cart-summary">
						<h3>Order Summary</h3>
						<p>Total Price: ₹{getTotalPrice()}</p>
						<button className="checkout-button" onClick={handleCheckout}>
							Proceed to Checkout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
