import React, { useState, useEffect } from "react"; // Import React and hooks
import { Link, useParams } from "react-router-dom"; // Import Link for navigation and useParams to get route parameters
import "../../assets/styles/Orders/OrderDetails.css"; // Import CSS for styling
import { getOrderDetailsById, IMAGE_URL } from "../../services/ApiService"; // Import API service functions and image URL constant

const OrderDetails = () => {
	const { orderId } = useParams(); // Get the orderId from route parameters
	const [order, setOrder] = useState(null); // State to store order details
	const [isLoading, setIsLoading] = useState(false); // State to manage loading status

	useEffect(() => {
		const fetchOrderDetails = async () => {
			setIsLoading(true); // Set loading state to true before fetching data
			try {
				const response = await getOrderDetailsById(orderId); // Fetch order details by ID
				setOrder(response.data); // Set the fetched order details to state
			} catch (error) {
				console.error("Error fetching order details:", error); // Log error if fetching fails
			} finally {
				setIsLoading(false); // Set loading state to false after fetching data
			}
		};
		fetchOrderDetails(); // Call function to fetch order details
	}, [orderId]); // Dependency array ensures re-fetching when orderId changes

	return (
		<div className="order-details-page">
			<h2>OrderId: #{orderId}</h2> {/* Display the order ID */}
			{isLoading ? (
				<h3>Loading order details...</h3> // Display loading message
			) : order ? (
				<>
					<p>Date: {new Date(order.created_at).toLocaleString()}</p>{" "}
					{/* Display order date */}
					<p>Total: ₹{order.total_price}</p> {/* Display total price */}
					<p>Status: {order.order_status}</p> {/* Display order status */}
					<h3>Items in this Order:</h3>
					<div className="order-items">
						{order.cart_items.map((item) => (
							<div key={item.id} className="order-item">
								<Link
									to={`/product/productDetails/${item.product_details.product_id}`}
									className="edit-link"
								>
									<img
										src={`${IMAGE_URL}${item.product_details.product_images[0]}`}
										alt={item.product_details.product_name}
										className="item-image"
									/>
								</Link>
								<div className="item-details">
									<h4>{item.name}</h4> {/* Display item name */}
									<p>Price: ₹{item.price}</p> {/* Display item price */}
									<p>Quantity: {item.quantity}</p> {/* Display item quantity */}
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<p>Order details not found.</p> // Message if no order details are found
			)}
		</div>
	);
};

export default OrderDetails; // Export the OrderDetails component
