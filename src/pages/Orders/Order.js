import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Orders/Orders.css";
import { getAllMyOrders } from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await getAllMyOrders();
				setOrders(response.data);
			} catch (error) {
				setError("Error fetching orders. Please try again later.");
				toast.error("Error fetching orders. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrders();
	}, []);

	if (isLoading) {
		return (
			<div className="my-orders-page">
				<h2>Loading orders...</h2>
			</div>
		);
	}

	if (error) {
		return (
			<div className="my-orders-page">
				<h2>{error}</h2>
			</div>
		);
	}

	return (
		<div className="my-orders-page">
			<h2>My Orders</h2>
			{orders.length > 0 ? (
				<div className="orders-list">
					{orders.map((order) => (
						<div key={order.order_id} className="order-card">
							<h3>Order ID: #{order.order_id}</h3>
							<p>Date: {new Date(order.created_at).toLocaleString()}</p>
							<p>Total: ₹{order.total_price}</p>
							<p>Status: {order.order_status}</p>
							<Link
								to={`/orders/orderDetails/${order.order_id}`}
								className="details-link"
							>
								View Details
							</Link>
						</div>
					))}
				</div>
			) : (
				<p>No orders found.</p>
			)}
		</div>
	);
};

export default Orders;
