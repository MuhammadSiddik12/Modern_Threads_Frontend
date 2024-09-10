import React from "react";
import "../assets/styles/Failed.css";
import { useParams } from "react-router-dom"; // Import Link for navigation and useParams to get route parameters

const FailedPage = () => {
	const { paymentId } = useParams();

	return (
		<div className="failed">
			<h1>Payment Failed</h1>
			{paymentId ? (
				<p>
					Unfortunately, your payment with ID <strong>{paymentId}</strong> could
					not be processed.
				</p>
			) : (
				<p>Something went wrong with your payment.</p>
			)}
			<button
				onClick={() => (window.location.href = "/")}
				className="save-button-failed"
			>
				Go to Home
			</button>
		</div>
	);
};

export default FailedPage;
