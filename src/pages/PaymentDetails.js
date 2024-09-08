import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPaymentById } from "../services/ApiService"; // Ensure you have this function
import "../assets/styles/PaymentDetails.css"; // Import CSS file

const PaymentDetailsPage = () => {
	const { transactionId } = useParams();
	const [transaction, setTransaction] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTransactionDetails = async () => {
			try {
				const response = await getPaymentById(transactionId);
				setTransaction(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTransactionDetails();
	}, [transactionId]);

	if (loading) return <div className="loading">Loading...</div>;
	if (error) return <div className="error">Error: {error}</div>;

	return (
		<div className="PaymentDetails">
			<h1>Transaction Details</h1>
			{transaction && (
				<div className="transaction-details">
					<p>
						<strong>Transaction ID:</strong> {transaction.payment_id}
					</p>
					<p>
						<strong>Total Amount:</strong> ₹{transaction.amount}
					</p>
					<h2>Items</h2>
					<ul>
						{transaction.cart_details.map((detail) => (
							<li key={detail.product_id}>
								Product Name: {detail.product_details.product_name}
								Product Id: {detail.product_id} - Quantity: {detail.quantity} -
								Price: ${detail.price}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PaymentDetailsPage;
