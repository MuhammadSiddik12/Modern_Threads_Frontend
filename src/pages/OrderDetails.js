import React from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/OrderDetails.css";

const OrderDetails = () => {
	const { orderId } = useParams();

	// Sample order details data
	const order = {
		id: orderId,
		date: "2024-08-29",
		total: 24999,
		status: "Delivered",
		items: [
			{
				id: 1,
				name: "Wireless Earbuds",
				price: 2999,
				quantity: 2,
				imageUrl:
					"https://www.gonoise.com/cdn/shop/files/3_copy_e16721a2-098d-49ff-a72f-580f05a928cb.webp?v=1720443494",
			},
			{
				id: 2,
				name: "Smartphone",
				price: 19999,
				quantity: 1,
				imageUrl:
					"https://oasis.opstatics.com/content/dam/oasis/page/2023/in/oneplus-10t/specs/10r-blue.png",
			},
		],
	};

	return (
		<div className="order-details-page">
			<h2>Order #{order.id} Details</h2>
			<p>Date: {order.date}</p>
			<p>Total: ₹{order.total}</p>
			<p>Status: {order.status}</p>

			<h3>Items in this Order:</h3>
			<div className="order-items">
				{order.items.map((item) => (
					<div key={item.id} className="order-item">
						<img src={item.imageUrl} alt={item.name} className="item-image" />
						<div className="item-details">
							<h4>{item.name}</h4>
							<p>Price: ₹{item.price}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderDetails;
