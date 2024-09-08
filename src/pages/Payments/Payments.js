import React, { useState, useEffect } from "react";
import { getAllPayments } from "../../services/ApiService"; // Ensure you have this function
import "../../assets/styles/Payments/Payment.css"; // Import CSS file

const Payment = () => {
	const [payments, setPayments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const response = await getAllPayments();
				console.log("🚀 ~ fetchPayments ~ response:", response);
				setPayments(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPayments();
	}, []);

	if (loading) return <div className="loading">Loading...</div>;
	if (error) return <div className="error">Error: {error}</div>;

	return (
		<div className="Payment">
			<h1>My Payments</h1>
			<ul>
				{payments.map((payment) => (
					<li key={payment.payment_id}>
						<a href={`/payments/${payment.payment_id}`}>
							Payment: {payment.payment_id} - ₹{payment.price}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Payment;
