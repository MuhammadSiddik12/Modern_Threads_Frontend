import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPaymentById } from "../../services/ApiService"; // Ensure you have this function
import "../../assets/styles/Payments/PaymentDetails.css"; // Import CSS file

const PaymentDetails = () => {
	const { paymentId } = useParams(); // Get paymentId from URL parameters
	const [transaction, setTransaction] = useState(null); // State to store transaction details
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [error, setError] = useState(null); // State to manage error messages

	useEffect(() => {
		// Fetch transaction details based on paymentId
		const fetchTransactionDetails = async () => {
			try {
				const response = await getPaymentById(paymentId); // API call to fetch payment details
				setTransaction(response.data); // Set transaction details in state
			} catch (err) {
				setError(err.message); // Set error message in state if fetching fails
			} finally {
				setLoading(false); // Set loading to false once data is fetched or an error occurs
			}
		};

		fetchTransactionDetails(); // Call the function to fetch transaction details
	}, [paymentId]); // Dependency array includes paymentId to refetch if it changes

	if (loading)
		return (
			<div>
				<h2>Loading...</h2> {/* Display loading state */}
			</div>
		);

	if (error) return <div className="error">Error: {error}</div>;
	{
		/* Display error message */
	}

	return (
		<div className="PaymentDetails">
			<h1>Transaction Details</h1> {/* Title of the payment details page */}
			{transaction && (
				<div className="transaction-details">
					<p>
						<strong>Transaction ID:</strong> {transaction.payment_id}{" "}
						{/* Display transaction ID */}
					</p>
					<p>
						<strong>Total Amount:</strong> ₹{transaction.amount}{" "}
						{/* Display total amount */}
					</p>
					<p>
						<strong>Payment Status:</strong> ₹{transaction.payment_status}{" "}
						{/* Display total amount */}
					</p>
					<h2>Items</h2>
					<ul>
						{transaction.cart_details.map((detail) => (
							<li key={detail.product_id}>
								Product Name: {detail.product_details.product_name}{" "}
								{/* Display product name */}
								Product Id: {detail.product_id} - Quantity: {detail.quantity} -
								Price: ₹{detail.price} {/* Display product details */}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PaymentDetails;
