import React from "react";
import "../assets/styles/Banner.css"; // Import the CSS styles
import { Link } from "react-router-dom";

const Banner = ({ bannerImg }) => {
	return (
		<Link to={`/shop`} className="edit-link">
			<div className="banner">
				{" "}
				{/* Container for the banner */}
				<img src={bannerImg} alt="Promotional Banner Image" />{" "}
				{/* Banner image */}
			</div>
		</Link>
	);
};

export default Banner; // Export the Banner component
