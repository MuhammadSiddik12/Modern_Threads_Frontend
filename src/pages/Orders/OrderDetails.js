import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/styles/Orders/OrderDetails.css";
import { getOrderDetailsById, IMAGE_URL } from "../../services/ApiService";

const OrderDetails = () => {
	const { orderId } = useParams();
	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			setIsLoading(true);
			try {
				const response = await getOrderDetailsById(orderId);

				setOrder(response.data);
			} catch (error) {
				console.error("Error fetching order details:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrderDetails();
	}, [orderId]); // Re-fetch on orderId change

	return (
		<div className="order-details-page">
			<h2>OrderId: #{orderId}</h2>
			{isLoading ? (
				<h3>Loading order details...</h3>
			) : order ? (
				<>
					<p>Date: {new Date(order.created_at).toLocaleString()}</p>
					<p>Total: ₹{order.total_price}</p>
					<p>Status: {order.order_status}</p>

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
									<h4>{item.name}</h4>
									<p>Price: ₹{item.price}</p>
									<p>Quantity: {item.quantity}</p>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<p>Order details not found.</p>
			)}
		</div>
	);
};

export default OrderDetails;
