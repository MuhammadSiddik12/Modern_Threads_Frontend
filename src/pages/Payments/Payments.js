import React, { useState, useEffect } from "react";
import { getAllPayments } from "../../services/ApiService"; // Ensure you have this function
import "../../assets/styles/Payments/Payment.css"; // Import CSS file

const Payment = () => {
	const [payments, setPayments] = useState([]); // State to store payments data
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [error, setError] = useState(null); // State to manage error messages

	// Fetch payments data from API on component mount
	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const response = await getAllPayments(); // API call to fetch payments
				setPayments(response.data); // Set payments data in state
			} catch (err) {
				setError(err.message); // Set error message in state
			} finally {
				setLoading(false); // Set loading to false once data is fetched
			}
		};

		fetchPayments(); // Call fetchPayments function
	}, []);

	if (loading)
		return (
			<div>
				<h2>Loading...</h2> {/* Display loading state */}
			</div>
		);

	if (error)
		return (
			<div className="error">
				Error: {error} {/* Display error message */}
			</div>
		);

	return (
		<div className="Payment">
			<h1>My Payments</h1> {/* Title of the payments page */}
			<ul>
				{payments.map((payment) => (
					<li key={payment.payment_id}>
						<a href={`/payments/${payment.payment_id}`}>
							Payment: {payment.payment_id} - ₹{payment.price}{" "}
							{/* Payment details */}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Payment;
