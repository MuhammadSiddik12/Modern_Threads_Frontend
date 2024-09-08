import React, { useState, useEffect } from "react";
import "../assets/styles/Cart.css";
import { Link } from "react-router-dom";
import {
	getCartItems,
	removeCartItem,
	checkoutCart,
	IMAGE_URL,
	getUserDetails,
	createPaymentCheckout,
} from "../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [buttonText, setButtonText] = useState("Proceed to Checkout");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [orderId, setOrderId] = useState(null);

	// Fetch cart items from API on component mount
	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCartItems(); // Fetch cart items from the API
				setCartItems(response.data);
				
				if (response.order_details.length) {
					setOrderId(response.order_details[0].order_id);
					setButtonText("Proceed to Payment");
				}
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
		setIsButtonDisabled(true);

		if (buttonText == "Proceed to Checkout") {
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
		} else {
			try {
				const payment = await createPaymentCheckout(orderId);
				console.log("🚀 ~ handleCheckout ~ payment:", payment);
				toast.success("Payment link created successful!");
				window.location.href = payment.data;
			} catch (err) {
				toast.error(err || "Checkout failed.");
			}
		}

		setIsButtonDisabled(false);
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
									{buttonText != "Proceed to Payment" ? (
										<button
											className="remove-button"
											onClick={() => handleRemoveItem(item.cart_id)}
										>
											Remove
										</button>
									) : (
										""
									)}
								</div>
							</div>
						))}
					</div>
					<div className="cart-summary">
						<h3>Order Summary</h3>
						<p>Total Price: ₹{getTotalPrice()}</p>
						<button
							className="checkout-button"
							onClick={handleCheckout}
							disabled={isButtonDisabled}
						>
							{buttonText}
						</button>
						{buttonText == "Proceed to Payment" ? (
							<button
								className="cancel-checkout-button"
								onClick={() => handleRemoveItem(item.cart_id)}
							>
								Cancel Order
							</button>
						) : (
							""
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
