import React from "react";
import "../assets/styles/Success.css";
import { useParams } from "react-router-dom"; // Import Link for navigation and useParams to get route parameters

const SuccessPage = () => {
	const { paymentId } = useParams();

	return (
		<div className="success">
			<h1>Payment Successful!</h1>
			{paymentId ? (
				<p>
					Your Payment ID is: <strong>{paymentId}</strong>
				</p>
			) : (
				<p>Thank you for your payment!</p>
			)}
			<button
				onClick={() => (window.location.href = "/")}
				className="save-button"
			>
				Go to Home
			</button>
		</div>
	);
};

export default SuccessPage;
