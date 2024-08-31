import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/MyOrders.css";

const MyOrders = () => {
	const orders = [
		{
			id: 1,
			date: "2024-08-29",
			total: 24999,
			status: "Delivered",
		},
		{
			id: 2,
			date: "2024-08-27",
			total: 1999,
			status: "Shipped",
		},
		{
			id: 3,
			date: "2024-08-25",
			total: 599,
			status: "Processing",
		},
	];

	return (
		<div className="my-orders-page">
			<h2>My Orders</h2>
			<div className="orders-list">
				{orders.map((order) => (
					<div key={order.id} className="order-card">
						<h3>Order #{order.id}</h3>
						<p>Date: {order.date}</p>
						<p>Total: ₹{order.total}</p>
						<p>Status: {order.status}</p>
						<Link
							to={`/orders/orderDetails/${order.id}`}
							className="details-link"
						>
							View Details
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyOrders;
