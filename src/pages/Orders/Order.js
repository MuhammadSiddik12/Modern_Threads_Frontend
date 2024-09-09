import React, { useState, useEffect } from "react"; // Import React and hooks
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../assets/styles/Orders/Orders.css"; // Import CSS for styling
import { getAllMyOrders } from "../../services/ApiService"; // Import function to fetch orders
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const Orders = () => {
	const [orders, setOrders] = useState([]); // State for storing orders
	const [isLoading, setIsLoading] = useState(true); // State for loading status
	const [error, setError] = useState(null); // State for error messages

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await getAllMyOrders(); // Fetch orders from API
				setOrders(response.data); // Set orders state
			} catch (error) {
				setError("Error fetching orders. Please try again later."); // Set error message
				toast.error("Error fetching orders. Please try again later."); // Show error notification
			} finally {
				setIsLoading(false); // Set loading state to false
			}
		};
		fetchOrders(); // Call function to fetch orders
	}, []); // Empty dependency array to run only on mount

	if (isLoading) {
		return (
			<div className="my-orders-page">
				<h2>Loading orders...</h2>
			</div>
		); // Show loading message
	}

	if (error) {
		return (
			<div className="my-orders-page">
				<h2>{error}</h2>
			</div>
		); // Show error message
	}

	return (
		<div className="my-orders-page">
			<h2>My Orders</h2> {/* Heading for orders list */}
			{orders.length > 0 ? (
				<div className="orders-list">
					{orders.map((order) => (
						<div key={order.order_id} className="order-card">
							<h3>Order ID: #{order.order_id}</h3> {/* Display order ID */}
							<p>Date: {new Date(order.created_at).toLocaleString()}</p>{" "}
							{/* Display order date */}
							<p>Total: ₹{order.total_price}</p> {/* Display total price */}
							<p>Status: {order.order_status}</p> {/* Display order status */}
							<Link
								to={`/orders/orderDetails/${order.order_id}`}
								className="details-link"
							>
								View Details {/* Link to order details */}
							</Link>
						</div>
					))}
				</div>
			) : (
				<p>No orders found.</p> /* Message if no orders are present */
			)}
		</div>
	);
};

export default Orders; // Export the Orders component
