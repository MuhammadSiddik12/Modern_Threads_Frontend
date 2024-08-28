import React from "react";
import "../assets/styles/Banner.css"; // Import the CSS styles

const Banner = ({ bannerImg }) => {
	return (
		<div className="banner">
			{" "}
			{/* Container for the banner */}
			<img src={bannerImg} alt="Promotional Banner Image" />{" "}
			{/* Banner image */}
		</div>
	);
};

export default Banner; // Export the Banner component
