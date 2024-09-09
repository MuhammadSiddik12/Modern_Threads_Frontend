import React, { useState, useEffect } from "react";
import "../../assets/styles/Products/Cart.css";
import { Link } from "react-router-dom";
import {
	getCartItems,
	removeCartItem,
	checkoutCart,
	IMAGE_URL,
	getUserDetails,
	createPaymentCheckout,
	cancelOrder,
} from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
	const [cartItems, setCartItems] = useState([]); // State to store cart items
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [error, setError] = useState(null); // State to manage error messages
	const [buttonText, setButtonText] = useState("Proceed to Checkout"); // State to manage button text
	const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled status
	const [orderId, setOrderId] = useState(null); // State to store order ID for payment
	const [cancelButtonText, setCancelButtonText] = useState("Cancel Order"); // State to manage cancel button text

	// Fetch cart items from API on component mount
	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCartItems(); // Fetch cart items from the API
				setCartItems(response.data); // Set cart items in state

				if (response.order_details.length) {
					setOrderId(response.order_details[0].order_id); // Set order ID if available
					setButtonText("Proceed to Payment"); // Update button text for payment
				}
			} catch (err) {
				toast.error(err.message || "Failed to fetch cart items."); // Display error message
				setError("Failed to fetch cart items.");
			} finally {
				setLoading(false); // Set loading to false after data is fetched
			}
		};

		fetchCartItems();
	}, []);

	// Calculate total price of cart items
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
			setCartItems(
				(prevItems) => prevItems.filter((item) => item.cart_id !== id) // Update cart items in state
			);
			toast.success("Item removed successfully!");
		} catch (err) {
			toast.error(err.message || "Failed to remove item."); // Display error message
			setError("Failed to remove item.");
		}
	};

	// Handle canceling an order
	const handleCancelOrder = async (orderId) => {
		setCancelButtonText("Canceling order");
		try {
			await cancelOrder(orderId); // API call to cancel order
			toast.success("Order canceled successfully!");
			setTimeout(() => {
				window.location.reload(); // Reload page after canceling order
			}, 1200);
		} catch (err) {
			toast.error(err.message || "Failed to cancel order."); // Display error message
		}
	};

	// Handle the checkout process
	const handleCheckout = async () => {
		setIsButtonDisabled(true);

		if (buttonText === "Proceed to Checkout") {
			setButtonText("Processing...");
			const orderItems = cartItems.map((item) => item.cart_id); // Get cart item IDs
			const user = await getUserDetails(); // Fetch user details
			const data = user.data;

			// Check if address fields are filled
			if (
				!data.street ||
				!data.city ||
				!data.state ||
				!data.zip_code ||
				!data.country
			) {
				toast.error("Please fill in your address before checking out.");
				setIsButtonDisabled(false); // Re-enable button
				return;
			}

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
				await checkoutCart(orderItems, shippingAddress, billingAddress); // API call to create order
				toast.success("Order created successfully!");
				window.location.reload(); // Reload page after successful order creation
			} catch (err) {
				toast.error(err.message || "Order creation failed."); // Display error message
			}
		} else {
			setButtonText("Processing payment...");
			try {
				const payment = await createPaymentCheckout(orderId); // Create payment checkout
				toast.success("Payment link created successfully!");
				window.location.href = payment.data; // Redirect to payment link
			} catch (err) {
				toast.error(err.message || "Checkout payment failed."); // Display error message
			}
		}
		setIsButtonDisabled(false); // Re-enable button after checkout process
	};

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2> {/* Display loading state */}
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>; // Display error message
	}

	return (
		<div className="cart-page">
			<h2>Your Cart</h2>
			{cartItems.length === 0 ? (
				<div className="empty-cart-container">
					<h3>Your cart is empty</h3>
					<Link to="/shop" className="edit-link">
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
									{buttonText !== "Proceed to Payment" &&
									buttonText !== "Processing payment..." ? (
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
						{buttonText === "Proceed to Payment" ? (
							<button
								className="cancel-checkout-button"
								onClick={() => handleCancelOrder(orderId)}
								disabled={isButtonDisabled}
							>
								{cancelButtonText}
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

export default Cart;
