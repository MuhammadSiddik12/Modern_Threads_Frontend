import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Orders/Orders.css";
import { getAllMyOrders } from "../../services/ApiService";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			setIsLoading(true);
			try {
				const response = await getAllMyOrders();
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrders();
	}, []);

	return (
		<div className="my-orders-page">
			<h2>My Orders</h2>
			{isLoading ? (
				<h2>Loading orders...</h2>
			) : orders.length > 0 ? (
				<div className="orders-list">
					{orders.map((order) => (
						<div key={order.order_id} className="order-card">
							<h3>OrderId: #{order.order_id}</h3>
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
